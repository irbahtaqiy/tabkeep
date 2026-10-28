document.addEventListener('DOMContentLoaded', async () => {
  const contextNameInput = document.getElementById('contextName');
  const saveBtn = document.getElementById('saveBtn');
  const tabCountEl = document.getElementById('tabCount');
  const sessionsList = document.getElementById('sessionsList');
  const emptyState = document.getElementById('emptyState');

  async function updateTabCount() {
    try {
      const tabs = await chrome.tabs.query({ currentWindow: true });
      const validTabs = tabs.filter(tab => tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://'));
      tabCountEl.textContent = `${validTabs.length} tab terdeteksi`;
      return validTabs;
    } catch (e) {
      tabCountEl.textContent = '0 tab terdeteksi';
      return [];
    }
  }

  async function renderSessions() {
    const sessions = await Storage.getSessions();
    sessionsList.innerHTML = '';

    if (sessions.length === 0) {
      emptyState.style.display = 'block';
      return;
    }

    emptyState.style.display = 'none';

    for (const session of sessions) {
      const item = document.createElement('div');
      item.className = 'session-item';

      const date = new Date(session.createdAt);
      const dateStr = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });

      item.innerHTML = `
        <div class="session-header">
          <div class="session-info">
            <div class="session-name">${escapeHtml(session.name)}</div>
            <div class="session-meta">${session.tabCount} tab • ${dateStr}</div>
          </div>
        </div>
        <div class="session-actions">
          <button class="btn-small restore" data-action="restore" data-id="${session.id}">Buka</button>
          <button class="btn-small delete" data-action="delete" data-id="${session.id}">Hapus</button>
        </div>
      `;

      sessionsList.appendChild(item);
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  saveBtn.addEventListener('click', async () => {
    const tabs = await updateTabCount();
    if (tabs.length === 0) {
      alert('Tidak ada tab yang bisa disimpan');
      return;
    }

    saveBtn.disabled = true;
    saveBtn.textContent = 'Menyimpan...';

    try {
      await Storage.saveSession(contextNameInput.value, tabs);
      contextNameInput.value = '';
      await renderSessions();
      saveBtn.textContent = 'Simpan semua tab di window ini';
      saveBtn.disabled = false;
    } catch (e) {
      alert('Gagal menyimpan tab');
      saveBtn.textContent = 'Simpan semua tab di window ini';
      saveBtn.disabled = false;
    }
  });

  sessionsList.addEventListener('click', async (e) => {
    const btn = e.target;
    if (btn.tagName !== 'BUTTON') return;

    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === 'delete') {
      if (confirm('Hapus grup ini?')) {
        await Storage.deleteSession(id);
        await renderSessions();
      }
    } else if (action === 'restore') {
      const sessions = await Storage.getSessions();
      const session = sessions.find(s => s.id === id);
      if (session && session.tabs.length > 0) {
        for (const tab of session.tabs) {
          chrome.tabs.create({ url: tab.url, pinned: tab.pinned });
        }
      }
    }
  });

  contextNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      saveBtn.click();
    }
  });

  await updateTabCount();
  await renderSessions();
});
