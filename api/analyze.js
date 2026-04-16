export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { prompt, userKey } = req.body;
  const key = process.env.GEMINI_KEY || userKey;

  if (!key) {
    return res.status(400).json({ error: { type: "no_key", message: "No API key available" } });
  }

  try {
    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-04-17:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 3000 },
        }),
      }
    );
    const data = await upstream.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) {
      res.status(200).json({ content: [{ text }] });
    } else {
      const msg = data.error?.message || JSON.stringify(data);
      res.status(upstream.status).json({ error: { type: "gemini_error", message: msg } });
    }
  } catch (e) {
    res.status(500).json({ error: { type: "server_error", message: e.message } });
  }
}
