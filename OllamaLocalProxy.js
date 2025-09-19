const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');

const app = express();

// تنظیم CORS برای پذیرش درخواست از هر دامنه
app.use(cors({
  origin: '*', // اجازه دسترسی از هر دامنه
  methods: ['GET', 'POST', 'OPTIONS', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// تبدیل JSON body برای درخواست‌های POST
app.use(express.json());

// پروکسی برای /api/generate
app.use('/api/generate', proxy('http://localhost:11434', {
  proxyReqPathResolver: () => '/api/generate',
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers['host'] = 'localhost:11434';
    proxyReqOpts.headers['origin'] = 'http://localhost:11434';
    proxyReqOpts.headers['referer'] = 'http://localhost:11434/';
    return proxyReqOpts;
  }
}));

app.use('/api/chat', proxy('http://localhost:11434', {
  proxyReqPathResolver: () => '/api/chat',
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers['host'] = 'localhost:11434';
    proxyReqOpts.headers['origin'] = 'http://localhost:11434';
    proxyReqOpts.headers['referer'] = 'http://localhost:11434/';
    return proxyReqOpts;
  }
}));

// پروکسی برای /api/tags
app.use('/api/tags', proxy('http://localhost:11434', {
  proxyReqPathResolver: () => '/api/tags',
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers['host'] = 'localhost:11434';
    proxyReqOpts.headers['origin'] = 'http://localhost:11434';
    proxyReqOpts.headers['referer'] = 'http://localhost:11434/';
    return proxyReqOpts;
  }
}));

// مدیریت خطاهای عمومی
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).send('Server Error');
});

// اجرا کردن سرور روی پورت 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});