const http = require('http');
const fs = require('fs');
const path = require('path');

// ポート番号（部屋番号）を3000に設定
const PORT = 3000;

const server = http.createServer((req, res) => {
    // ユーザーがアクセスしてきたら、同じフォルダの「index.html」を読み込んで返す
    // ※もしHTMLファイルの名前が「index.html」ではない場合は、下の文字を書き換えてください
    const filePath = path.join(__dirname, 'index.html');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('HTMLファイルが見つからないか、読み込めませんでした。');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
    });
});

// サーバーを起動
server.listen(PORT, '0.0.0.0', () => {
    console.log(`==================================================`);
    console.log(` 🚀 サーバーが正常に起動しました！`);
    console.log(` 💻 パソコンで見る場合: http://localhost:${PORT}`);
    console.log(`==================================================`);
});