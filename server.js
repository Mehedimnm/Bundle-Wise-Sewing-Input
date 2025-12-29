import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Environment Variables থেকে URL নেওয়া
const MAIN_URL = process.env.VITE_ERP_URL_MAIN || 'http://180.92.235.190:8022';
const BACKUP_URL = process.env.VITE_ERP_URL_BACKUP || 'http://103.231.177.24:8022';

// 1. মেইন সার্ভারের জন্য প্রোক্সি
app.use('/erp', createProxyMiddleware({
    target: MAIN_URL,
    changeOrigin: true,
    pathRewrite: { '^/erp': '' },
    onProxyReq: (proxyReq) => {
        // কোনো স্পেশাল হেডার থাকলে এখানে সেট করা যাবে
    }
}));

// 2. ব্যাকআপ সার্ভারের জন্য প্রোক্সি
app.use('/erp-backup', createProxyMiddleware({
    target: BACKUP_URL,
    changeOrigin: true,
    pathRewrite: { '^/erp-backup': '' }
}));

// 3. React এর তৈরি করা ফাইলগুলো সার্ভ করা
app.use(express.static(path.join(__dirname, 'dist')));

// যেকোনো রুটে হিট করলে index.html পাঠানো (React Router এর জন্য)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
