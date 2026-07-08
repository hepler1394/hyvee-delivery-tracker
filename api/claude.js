// Secure server-side proxy to the Anthropic Messages API.
//
// The real key lives ONLY in the ANTHROPIC_API_KEY environment variable on Vercel
// and is never sent to the browser. The static page calls /api/claude with the same
// body it would send to api.anthropic.com; this function attaches the key server-side.
//
// Abuse note: this proxies to your Anthropic account. We reject cross-origin calls,
// but that is a deterrent, not hard security — keep a spend limit set in the Anthropic
// console. Rotate the key if it is ever exposed.

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: { message: 'POST only' } });
    return;
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    res.status(500).json({ error: { message: 'Server is missing ANTHROPIC_API_KEY' } });
    return;
  }

  // Only serve requests coming from this site's own origin.
  const host = (req.headers.host || '').toLowerCase();
  const origin = (req.headers.origin || '').toLowerCase().replace(/^https?:\/\//, '');
  if (origin && host && origin !== host) {
    res.status(403).json({ error: { message: 'Forbidden origin' } });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body,
    });
    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader('Content-Type', 'application/json');
    res.send(text);
  } catch (e) {
    res.status(502).json({ error: { message: 'Proxy error: ' + String((e && e.message) || e) } });
  }
};
