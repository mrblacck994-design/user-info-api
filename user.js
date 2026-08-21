module.exports = async function handler(req, res) {
  // Vercel serverless function: /api/user/:userId
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const userId = String(req.query.userId || req.query.id || "").trim();

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  const baseUrl = (process.env.API_BASE_URL || "").replace(/\/+$/, "");
  const apiPath = process.env.API_PATH || "/app/user/info/person";
  const token = process.env.API_TOKEN || "";
  const userIdParam = process.env.USER_ID_PARAM || "userId";

  if (!baseUrl || !token) {
    return res.status(500).json({
      error: "API configuration is missing. Configure API_BASE_URL and API_TOKEN in Vercel Environment Variables."
    });
  }

  try {
    const url = new URL(apiPath, baseUrl);
    url.searchParams.set(userIdParam, userId);

    const upstream = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": token.startsWith("Bearer ")
          ? token
          : `Bearer ${token}`
      }
    });

    const text = await upstream.text();
    let body;
    try {
      body = JSON.parse(text);
    } catch {
      body = { raw: text };
    }

    return res.status(upstream.status).json(body);
  } catch (error) {
    console.error("Authorized API request failed:", error);
    return res.status(502).json({
      error: "Unable to reach the authorized API."
    });
  }
};
