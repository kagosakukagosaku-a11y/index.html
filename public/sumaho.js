const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
// 状況を保存するためのファイルのパス
const STATUS_FILE = path.join(__dirname, 'status.json');

// 初期設定（ファイルがない場合のデフォルト値）
if (!fs.existsSync(STATUS_FILE)) {
    fs.writeFileSync(STATUS_FILE, JSON.stringify({ type: 'open', news: [] }, null, 2));
}

const server = http.createServer((req, res) => {
    // 💡 1. 状況を保存する命令（POST）がスマホから届いたとき
    if (req.method === 'POST' && req.url === '/api/set-status') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                // status.json に書き込んで保存
                fs.writeFileSync(STATUS_FILE, JSON.stringify(data, null, 2));
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } catch (e) {
                res.writeHead(400);
                res.end('Bad Request');
            }
        });
        return;
    }

    // 💡 2. 現在の状況データを読み込む命令（GET）が届いたとき
    if (req.method === 'GET' && req.url === '/api/get-status') {
        const statusData = fs.readFileSync(STATUS_FILE, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(statusData);
        return;
    }

    // 💡 3. 通常の画面アクセス（HTMLを表示）
    if (req.url === '/' || req.url === '/index.html') {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('HTMLファイルが読み込めませんでした。');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });
        return;
    }

    // その他のリクエストは404エラー
    res.writeHead(404);
    res.end('Not Found');
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`==================================================`);
    console.log(` 🚀 パワーアップしたサーバーが起動しました！`);
    console.log(` 💻 http://localhost:${PORT} で確認してください`);
    console.log(`==================================================`);
});