(function() {
    // 編集用の管理パネルを作成
    const adminPanel = document.createElement('div');
    adminPanel.style.position = 'fixed';
    adminPanel.style.bottom = '10px';
    adminPanel.style.left = '50%';
    adminPanel.style.transform = 'translateX(-50%)';
    adminPanel.style.width = '90%';
    adminPanel.style.maxWidth = '350px';
    adminPanel.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    adminPanel.style.border = '2px solid #ffb6c1';
    adminPanel.style.borderRadius = '15px';
    adminPanel.style.padding = '15px';
    adminPanel.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    adminPanel.style.zIndex = '99999';
    adminPanel.style.fontFamily = 'sans-serif';

    adminPanel.innerHTML = `
        <h4 style="margin: 0 0 10px 0; color: #d87093; text-align: center; font-size: 16px;">🌸 さくら眼科 管理画面</h4>
        <p style="margin: 0 0 10px 0; font-size: 13px; color: #555; text-align: center;">現在の受付状況を変更できます：</p>
        <div style="display: flex; gap: 8px; justify-content: center;">
            <button id="btn-normal" style="padding: 8px 12px; border: none; border-radius: 8px; background-color: #28a745; color: white; cursor: pointer; font-weight: bold;">通常</button>
            <button id="btn-busy" style="padding: 8px 12px; border: none; border-radius: 8px; background-color: #ffc107; color: #333; cursor: pointer; font-weight: bold;">やや混雑</button>
            <button id="btn-crowded" style="padding: 8px 12px; border: none; border-radius: 8px; background-color: #dc3545; color: white; cursor: pointer; font-weight: bold;">混雑</button>
        </div>
    `;
    document.body.appendChild(adminPanel);

    // ボタンを押した時の動きを設定
    const statusText = document.querySelector('.status-badge') || document.body; 
    
    document.getElementById('btn-normal').addEventListener('click', () => {
        alert('受付状況を【通常】に変更しました！');
    });
    document.getElementById('btn-busy').addEventListener('click', () => {
        alert('受付状況を【やや混雑】に変更しました！');
    });
    document.getElementById('btn-crowded').addEventListener('click', () => {
        alert('受付状況を【混雑】に変更しました！');
    });
})();