(function() {
    // 1. 古い管理パネルや花びらがあれば削除
    const oldPanel = document.getElementById('sakura-admin-panel');
    if (oldPanel) oldPanel.remove();
    const oldPetal = document.getElementById('sakura-secret-petal');
    if (oldPetal) oldPetal.remove();

    // 現在の状況を保存しておく変数（初期値は「受付中」）
    let currentStatusText = '受付中';
    let currentStatusColor = '#28a745';

    // 2. 右上の「隠し花びら」ボタンを作成
    const secretPetal = document.createElement('div');
    secretPetal.id = 'sakura-secret-petal';
    secretPetal.style.position = 'fixed';
    secretPetal.style.top = '20px';
    secretPetal.style.right = '20px';
    secretPetal.style.width = '40px';
    secretPetal.style.height = '40px';
    secretPetal.style.cursor = 'pointer';
    secretPetal.style.zIndex = '999999';
    secretPetal.style.backgroundColor = '#ffb6c1';
    secretPetal.style.borderRadius = '0% 100% 0% 100% / 0% 100% 0% 100%';
    secretPetal.style.transform = 'rotate(-45deg)';
    secretPetal.style.boxShadow = '0 2px 8px rgba(255,182,193,0.6)';
    document.body.appendChild(secretPetal);

    // 3. 管理画面パネルを作成
    const adminPanel = document.createElement('div');
    adminPanel.id = 'sakura-admin-panel';
    adminPanel.style.position = 'fixed';
    adminPanel.style.bottom = '10px';
    adminPanel.style.left = '50%';
    adminPanel.style.transform = 'translateX(-50%) translateY(150%)';
    adminPanel.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    adminPanel.style.width = '90%';
    adminPanel.style.maxWidth = '360px';
    adminPanel.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    adminPanel.style.border = '2px solid #ffb6c1';
    adminPanel.style.borderRadius = '15px';
    adminPanel.style.padding = '15px';
    adminPanel.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    adminPanel.style.zIndex = '99999';
    adminPanel.style.fontFamily = 'sans-serif';
    adminPanel.style.boxSizing = 'border-box';

    adminPanel.innerHTML = `
        <h4 style="margin: 0 0 5px 0; color: #d87093; text-align: center; font-size: 16px; font-weight: bold;">🌸 さくら眼科 管理画面</h4>
        <p style="margin: 10px 0 5px 0; font-size: 12px; color: #555; font-weight: bold;">📢 次の「確認ボタン」の状況を設定</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
            <button id="btn-normal" style="padding: 8px; border: none; border-radius: 6px; background-color: #28a745; color: white; cursor: pointer; font-weight: bold; font-size: 13px;">受付中</button>
            <button id="btn-break" style="padding: 8px; border: none; border-radius: 6px; background-color: #17a2b8; color: white; cursor: pointer; font-weight: bold; font-size: 13px;">休憩中</button>
            <button id="btn-busy" style="padding: 8px; border: none; border-radius: 6px; background-color: #dc3545; color: white; cursor: pointer; font-weight: bold; font-size: 13px;">混雑</button>
            <button id="btn-closed" style="padding: 8px; border: none; border-radius: 6px; background-color: #6c757d; color: white; cursor: pointer; font-weight: bold; font-size: 13px;">休診</button>
        </div>
        <button id="btn-close-panel" style="margin-top: 12px; width: 100%; padding: 4px; border: 1px solid #ccc; border-radius: 6px; background: none; color: #888; cursor: pointer; font-size: 11px;">メニューを閉じる</button>
    `;
    document.body.appendChild(adminPanel);

    // 花びらクリックでの管理画面開閉
    let isOpen = false;
    secretPetal.addEventListener('click', () => {
        isOpen = !isOpen;
        adminPanel.style.transform = isOpen ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(150%)';
    });
    document.getElementById('btn-close-panel').addEventListener('click', () => {
        isOpen = false;
        adminPanel.style.transform = 'translateX(-50%) translateY(150%)';
    });

    // 管理画面で状況をセットする処理
    function setStatus(text, color) {
        currentStatusText = text;
        currentStatusColor = color;
        alert(`確認ボタンの反応を【${text}】にセットしました！`);
    }
    document.getElementById('btn-normal').addEventListener('click', () => setStatus('ただいま【受付中】です。', '#28a745'));
    document.getElementById('btn-break').addEventListener('click', () => setStatus('ただいま【休憩中】です。しばらくお待ちください。', '#17a2b8'));
    document.getElementById('btn-busy').addEventListener('click', () => setStatus('ただいま【混雑】しています。お時間に余裕を持ってお越しください。', '#dc3545'));
    document.getElementById('btn-closed').addEventListener('click', () => setStatus('本日は【休診】です。', '#6c757d'));

    // 4. 実際の「受付状況を確認する」ボタンを見つけて、タップ時の動きをつける
    const checkButtons = Array.from(document.querySelectorAll('a, button')).filter(el => el.textContent.includes('受付状況を確認する'));
    
    checkButtons.forEach(btn => {
        // 元のリンクの動き（画面移動など）を一旦止める
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 画面にかわいいお知らせメッセージを表示する
            const alertBox = document.createElement('div');
            alertBox.style.position = 'fixed';
            alertBox.style.top = '40%';
            alertBox.style.left = '50%';
            alertBox.style.transform = 'translate(-50%, -50%)';
            alertBox.style.backgroundColor = 'white';
            alertBox.style.border = `3px solid ${currentStatusColor}`;
            alertBox.style.borderRadius = '15px';
            alertBox.style.padding = '20px';
            alertBox.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            alertBox.style.zIndex = '9999999';
            alertBox.style.textAlign = 'center';
            alertBox.style.fontFamily = 'sans-serif';
            alertBox.style.width = '80%';
            alertBox.style.maxWidth = '280px';

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
    });
})();