export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const zapierUrl = process.env.ZAPIER_WEBHOOK_URL;
  
    try {
      const zapierRes = await fetch(zapierUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
  
      if (!zapierRes.ok) {
        return res.status(500).json({ error: 'Zapier request failed' });
      }
  
      res.status(200).json({ message: 'Form submitted to Zapier' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  