const http = require('http');
const request = require('request');
const config = require('../src/config/config');

console.log(config.api_address)
const proxyServer = http.createServer((proxyReq, proxyRes) => {
    const targetUrl = config.api_address + proxyReq.url;

    // 转发请求给目标服务器
    request(targetUrl, (error, response, body) => {
        if (error) {
            console.error('Error:', error);
            proxyRes.statusCode = 500;
            proxyRes.end();
        } else {
            // 将目标服务器的响应返回给前端页面
            proxyRes.writeHead(response.statusCode, response.headers);
            proxyRes.write(body);
            proxyRes.end();
        }
    });
});

const proxyPort = 443; // 代理服务器的端口号
proxyServer.listen(proxyPort, () => {
    console.log(`代理服务器已启动，监听端口 ${proxyPort}`);
});
