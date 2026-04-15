export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { prompt, userKey } = req.body;
  const key = process.env.ANTHROPIC_KEY || userKey;

  if (!key) {
    return res.status(400).json({ error: { type: "no_key", message: "No API key available" } });
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 3000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (e) {
    res.status(500).json({ error: { type: "server_error", message: e.message } });
  }
}
