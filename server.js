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

// 1. মেইন সার্ভার প্রোক্সি (আপডেট করা হয়েছে)
app.use('/erp', createProxyMiddleware({
    target: MAIN_URL,
    changeOrigin: true,
    secure: false,
    cookieDomainRewrite: "", // কুকি ডোমেইন ফিক্স (Session ধরে রাখার জন্য)
    // pathRewrite: { '^/erp': '' }, // এই লাইনটি বন্ধ করা হলো কারণ লোকাল সেটিংসে /erp ছিল
    onProxyReq: (proxyReq) => {
        // ব্রাউজার সেজে রিকোয়েস্ট পাঠানো
        proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    }
}));

// 2. ব্যাকআপ সার্ভার প্রোক্সি (আপডেট করা হয়েছে)
app.use('/erp-backup', createProxyMiddleware({
    target: BACKUP_URL,
    changeOrigin: true,
    secure: false,
    cookieDomainRewrite: "" // কুকি ডোমেইন ফিক্স
    // pathRewrite: { '^/erp-backup': '' } // এটিও বন্ধ রাখা হলো
}));

app.use(express.static(path.join(__dirname, 'dist')));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
