import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Env Variables
const MAIN_URL = process.env.VITE_ERP_URL_MAIN || 'http://180.92.235.190:8022';
const BACKUP_URL = process.env.VITE_ERP_URL_BACKUP || 'http://103.231.177.24:8022';

// --- PYTHON HEADER MIRRORING ---
const onProxyReq = (proxyReq, req, res) => {
    // 1. Python এর 'headers_common' হুবহু কপি করা হলো
    proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36');
    proxyReq.setHeader('Origin', 'http://180.92.235.190:8022');
    
    // 2. Referer ফিক্স: Python এর মতো ডায়নামিক Referer
    // ডিফল্ট হিসেবে আমরা মেইন পেজের লিংক দিচ্ছি যা লগইন ও সার্চের জন্য জরুরি
    proxyReq.setHeader('Referer', 'http://180.92.235.190:8022/production/bundle_wise_sewing_input.php');

    // 3. AJAX রিকোয়েস্ট চেনার জন্য (Python এ যা 'headers_ajax' ছিল)
    if (req.url.includes('create_challan_search_list_view') || req.url.includes('bundle_nos') || req.url.includes('populate_bundle_data_update')) {
        proxyReq.setHeader('X-Requested-With', 'XMLHttpRequest');
    }
};

const cookieFix = (proxyRes, req, res) => {
    // কুকি ম্যানেজমেন্ট (Python Session এর কাজ করবে)
    if (proxyRes.headers['set-cookie']) {
        proxyRes.headers['set-cookie'] = proxyRes.headers['set-cookie'].map(cookie => {
            return cookie.replace(/; secure/gi, '').replace(/; SameSite=None/gi, '; SameSite=Lax');
        });
    }
};

const proxyConfig = {
    target: MAIN_URL,
    changeOrigin: true,
    secure: false,
    pathRewrite: { '^/erp': '' }, // পাথ ক্লিন করা
    onProxyReq: onProxyReq,
    onProxyRes: cookieFix
};

app.use('/erp', createProxyMiddleware(proxyConfig));
app.use('/erp-backup', createProxyMiddleware({ ...proxyConfig, target: BACKUP_URL, pathRewrite: { '^/erp-backup': '' } }));

app.use(express.static(path.join(__dirname, 'dist')));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
