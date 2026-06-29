export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const url = process.env.APPS_SCRIPT_URL;
        if (!url) {
            return res.status(500).json({ status: "error", message: "Missing APPS_SCRIPT_URL environment variable" });
        }

        // إرسال البيانات إلى الـ Google Apps Script المحدث الذي يقبل الـ JSON Body
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error("Vercel Register Proxy Error:", error);
        return res.status(500).json({ status: "error", message: error.message });
    }
}