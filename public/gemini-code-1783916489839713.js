(function() {
    // 内部で現在の状況を保存する変数（初期値は「受付中」）
    let currentStatusText = '受付中';
    let currentStatusColor = '#28a745';

    // 状況をセットする処理を上書き
    function setStatus(text, color) {
        currentStatusText = text;
        currentStatusColor = color;
        alert(`ボタンの反応を【${text}】に設定しました！`);
    }

    // 画面にある管理画面のボタンに機能を割り当て
    const btnNormal = document.getElementById('btn-normal');
    const btnBreak = document.getElementById('btn-break') || document.getElementById('btn-busy')? document.querySelectorAll('#sakura-admin-panel button')[1] : null;
    const btnBusy = document.getElementById('btn-busy') || document.querySelectorAll('#sakura-admin-panel button')[2];
    const btnClosed = document.getElementById('btn-closed') || document.querySelectorAll('#sakura-admin-panel button')[3];

    if(btnNormal) btnNormal.onclick = () => setStatus('ただいま【受付中】です。', '#28a745');
    // 「やや混雑」ボタンを「休憩中」の機能に変えます
    if(btnBreak) {
        btnBreak.innerText = '休憩中';
        btnBreak.style.backgroundColor = '#17a2b8';
        btnBreak.onclick = () => setStatus('ただいま【休憩中】です。しばらくお待ちください。', '#17a2b8');
    }
    if(btnBusy) btnBusy.onclick = () => setStatus('ただいま【混雑】しています。', '#dc3545');
    
    // 「休診」ボタンがなければ新しく追加
    if(!document.getElementById('btn-closed') && btnBusy) {
        const btnClosedNew = document.createElement('button');
        btnClosedNew.id = 'btn-closed';
        btnClosedNew.innerText = '休診';
        btnClosedNew.style.cssText = 'padding: 8px; border: none; border-radius: 6px; background-color: #6c757d; color: white; cursor: pointer; font-weight: bold; font-size: 13px;';
        btnClosedNew.onclick = () => setStatus('本日は【休診】です。', '#6c757d');
        btnBusy.parentElement.appendChild(btnClosedNew);
    }

    // 実際の「受付状況を確認する」ボタンを見つけて連動させる
    const checkBtn = Array.from(document.querySelectorAll('a, button')).find(el => el.textContent.includes('受付状況を確認する'));
    
    if (checkBtn) {
        checkBtn.addEventListener('click', function(e) {
            e.preventDefault(); // 本来のページ移動を止める
            
            // 画面の真ん中に案内ポップアップを出す
            const alertBox = document.createElement('div');
            alertBox.style.cssText = `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; border: 3px solid ${currentStatusColor}; border-radius: 15px; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 9999999; text-align: center; width: 80%; max-width: 280px; font-family: sans-serif;`;

            alertBox.innerHTML = `
                <div style="font-size: 24px; margin-bottom: 10px;">🌸</div>
                <p style="font-size: 16px; font-weight: bold; margin: 0 0 15px 0; color: #333;">${currentStatusText}</p>
                <button id="alert-close-btn" style="padding: 6px 20px; border: none; background-color: ${currentStatusColor}; color: white; border-radius: 20px; cursor: pointer; font-weight: bold;">閉じる</button>
            `;
            document.body.appendChild(alertBox);

            document.getElementById('alert-close-btn').addEventListener('click', () => {
                alertBox.remove();
            });
        });
    }
})();