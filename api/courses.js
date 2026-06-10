export default async function handler(req, res) {
    // السيرفر بيقرا الرابط السري اللي في إعدادات فيرسيل في صمت تماماً
    const url = process.env.APPS_SCRIPT_URL;

    if (!url) {
        return res.status(500).json({ 
            error: "Missing APPS_SCRIPT_URL in Vercel env variables" 
        });
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        // يبعت البيانات للمتصفح جاهزة
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
}