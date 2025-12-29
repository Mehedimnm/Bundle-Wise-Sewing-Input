import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const MAIN_URL = process.env.VITE_ERP_URL_MAIN || 'http://180.92.235.190:8022';
const BACKUP_URL = process.env.VITE_ERP_URL_BACKUP || 'http://103.231.177.24:8022';

// কুকি ফিক্স করার ফাংশন
const cookieFix = (proxyRes, req, res) => {
    if (proxyRes.headers['set-cookie']) {
        proxyRes.headers['set-cookie'] = proxyRes.headers['set-cookie'].map(cookie => {
            return cookie
                .replace(/; secure/gi, '') // HTTP তে Secure ফ্ল্যাগ সরাচ্ছে
                .replace(/; SameSite=None/gi, '; SameSite=Lax'); // সেফটির জন্য Lax
        });
    }
};

// 1. মেইন সার্ভার প্রোক্সি
app.use('/erp', createProxyMiddleware({
    target: MAIN_URL,
    changeOrigin: true,
    secure: false,
    pathRewrite: { '^/erp': '' }, // এই লাইনটি জাদুর মতো কাজ করবে (লিংক ঠিক করবে)
    onProxyRes: cookieFix,
    logLevel: 'debug' // Render লগে ডিটেইলস দেখার জন্য
}));

// 2. ব্যাকআপ সার্ভার প্রোক্সি
app.use('/erp-backup', createProxyMiddleware({
    target: BACKUP_URL,
    changeOrigin: true,
    secure: false,
    pathRewrite: { '^/erp-backup': '' }, // এখানেও লিংক ঠিক করা হলো
    onProxyRes: cookieFix,
    logLevel: 'debug'
}));

// 3. ফ্রন্টএন্ড সার্ভ করা
app.use(express.static(path.join(__dirname, 'dist')));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
