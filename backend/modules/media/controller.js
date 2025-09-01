import cloudinary from 'cloudinary';
import fs from 'fs/promises';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// return params client can use for unsigned upload or signed direct upload
export async function signUpload(req, res, next) {
    try {
        // for Cloudinary unsigned approach you may use upload_preset; for signed:
        const timestamp = Math.floor(Date.now() / 1000);
        const paramsToSign = { folder: 'social_app', timestamp };
        const signature = cloudinary.v2.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);
        res.json({ signature, api_key: process.env.CLOUDINARY_API_KEY, timestamp, cloud_name: process.env.CLOUDINARY_CLOUD_NAME });
    } catch (e) { next(e); }
}

// frontend uploads to cloudinary, then calls confirm with returned public_id and secure_url
export async function confirmUpload(req, res, next) {
    try {
        const { public_id, url, resource_type } = req.body;
        if (!public_id || !url) return res.status(400).json({ message: 'Missing public_id or url' });
        // Save to DB if needed, or return to client
        
        res.json({ public_id, url, resource_type });
    } catch (e) { next(e); }
}

// fallback: server receives file, uploads to cloudinary and returns url
export async function uploadFallback(req, res, next) {
    try {
        if (!req.file) return res.status(400).json({ message: 'File required' });
        const r = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'social_app' });
        await fs.unlink(req.file.path);
        res.json({ url: r.secure_url, public_id: r.public_id, resource_type: r.resource_type });
    } catch (e) { next(e); }
}
