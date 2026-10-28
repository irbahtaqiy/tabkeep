document.addEventListener('DOMContentLoaded', async () => {
  const contextNameInput = document.getElementById('contextName');
  const saveBtn = document.getElementById('saveBtn');
  const tabCountEl = document.getElementById('tabCount');
  const sessionsList = document.getElementById('sessionsList');
  const emptyState = document.getElementById('emptyState');

  const confirmModal = document.getElementById('confirmModal');
  const confirmSessionName = document.getElementById('confirmSessionName');
  const modalCancel = document.getElementById('modalCancel');
  const modalConfirm = document.getElementById('modalConfirm');

  let isSaving = false;
  let pendingDeleteId = null;

  function openDeleteModal(name) {
    if (!confirmModal) return false;
    confirmSessionName.textContent = name ? `"${name}"` : 'grup ini';
    pendingDeleteId = null;
    confirmModal.style.display = 'flex';
    return true;
  }

  function closeDeleteModal() {
    if (!confirmModal) return;
    confirmModal.style.display = 'none';
    pendingDeleteId = null;
  }

  async function updateTabCount() {
    try {
      const tabs = await chrome.tabs.query({ currentWindow: true });
      const validTabs = tabs.filter(
        (tab) =>
          tab.url &&
          !tab.url.startsWith('chrome://') &&
          !tab.url.startsWith('chrome-extension://') &&
          !tab.url.startsWith('edge://') &&
          !tab.url.startsWith('brave://')
      );
      tabCountEl.textContent = `${validTabs.length} tab terdeteksi`;
      return validTabs;
    } catch (e) {
      tabCountEl.textContent = '0 tab terdeteksi';
      return [];
    }
  }

  function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  async function renderSessions() {
    const sessions = await Storage.getSessions();
    sessionsList.innerHTML = '';

    if (sessions.length === 0) {
      emptyState.style.display = 'flex';
      return;
    }

    emptyState.style.display = 'none';

    for (const session of sessions) {
      const item = document.createElement('article');
      item.className = 'session-card';
      item.dataset.id = session.id;

      item.innerHTML = `
        <div class="session-main">
          <div class="session-info">
            <div class="session-name" title="${escapeHtml(session.name)}">${escapeHtml(session.name)}</div>
            <div class="session-meta">
              <span>${session.tabCount} tab</span>
              <span class="meta-dot"></span>
              <span>${formatDate(session.createdAt)}</span>
            </div>
          </div>
          <div class="session-actions">
            <button class="icon-btn edit" data-action="edit" data-id="${session.id}" title="Edit nama">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.1666 2.5C14.3855 2.28113 14.6453 2.10752 14.9313 1.98906C15.2173 1.87061 15.5237 1.80972 15.8333 1.80972C16.1429 1.80972 16.4493 1.87061 16.7353 1.98906C17.0213 2.10752 17.2811 2.28113 17.5 2.5C17.7189 2.71887 17.8925 2.97871 18.011 3.26468C18.1294 3.55064 18.1903 3.85701 18.1903 4.16667C18.1903 4.47633 18.1294 4.78269 18.011 5.06866C17.8925 5.35463 17.7189 5.60447 17.5 5.83333L6.24996 17.0833L1.66663 18.3333L2.91663 13.75L14.1666 2.5Z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="icon-btn restore" data-action="restore" data-id="${session.id}" title="Buka semua tab">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.33337 11.6667L15 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 9.16667V5H10.8334" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.16663 5H6.66663C5.74616 5 5 5.74619 5 6.66667V13.3333C5 14.2538 5.74616 15 6.66663 15H13.3333C14.2538 15 15 14.2538 15 13.3333V10.8333" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="icon-btn delete" data-action="delete" data-id="${session.id}" title="Hapus grup">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 5H4.16667H17.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.66663 5V3.33333C6.66663 2.89131 6.84222 2.41738 7.15478 2.10482C7.46734 2.10229 7.89131 2.08334 8.33333 2.08334H11.6666C12.1087 2.08334 12.5826 2.10229 12.8952 2.10482C12.2077 2.41738 12.0833 2.89131 12.0833 3.33333V5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.8334 5V16.6667C15.8334 17.1087 15.6578 17.5871 15.3452 17.8997C15.0327 18.2122 14.5587 18.3333 14.1167 18.3333H5.88337C5.44134 18.3333 5.16738 18.2122 5.85482 17.8997C5.54226 17.5871 5.16663 17.1087 5.16663 16.6667V5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.33337 9.16667V14.1667" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.6666 9.16667V14.1667" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      `;
      sessionsList.appendChild(item);
    }
  }

  function startInlineEdit(sessionId, currentName) {
    const card = sessionsList.querySelector(`.session-card[data-id="${sessionId}"]`);
    if (!card) return;
    const nameEl = card.querySelector('.session-name');
    const infoEl = card.querySelector('.session-info');
    if (!nameEl || !infoEl) return;

    if (infoEl.querySelector('.session-name-input')) return;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'session-name-input';
    input.value = currentName;
    input.maxLength = 40;
    input.spellcheck = false;

    infoEl.prepend(input);
    nameEl.style.display = 'none';

    input.focus();
    input.select();

    async function save() {
      const newName = input.value;
      if (newName.trim() === '') {
        alert('Nama grup nggak boleh kosong');
        input.focus();
        input.select();
        return;
      }
      input.disabled = true;
      await Storage.updateSessionName(sessionId, newName);
      await renderSessions();
    }

    function cancel() {
      if (infoEl.contains(input)) {
        input.remove();
      }
      if (nameEl) nameEl.style.display = 'block';
    }

    input.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        await save();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        cancel();
      }
    });

    input.addEventListener('blur', async () => {
      setTimeout(async () => {
        if (document.activeElement === input) return;
        if (!input.isConnected) return;
        await save();
      }, 50);
    });
  }

  if (modalCancel) {
    modalCancel.addEventListener('click', closeDeleteModal);
  }

  if (modalConfirm) {
    modalConfirm.addEventListener('click', async () => {
      if (!pendingDeleteId) {
        closeDeleteModal();
        return;
      }
      await Storage.deleteSession(pendingDeleteId);
      closeDeleteModal();
      await renderSessions();
    });
  }

  if (confirmModal) {
    confirmModal.addEventListener('click', (e) => {
      if (e.target === confirmModal) {
        closeDeleteModal();
      }
    });
  }

  const saveBtnHTML = saveBtn.innerHTML;

  saveBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (isSaving) return;

    const tabs = await updateTabCount();
    if (tabs.length === 0) {
      alert('Tidak ada tab valid yang bisa disimpan');
      return;
    }

    isSaving = true;
    saveBtn.disabled = true;
    saveBtn.innerHTML = `
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.2" opacity="0.4"/>
        <path d="M10 6V10L12.5 12.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Menyimpan...
    `;

    try {
      const currentTabs = await chrome.tabs.query({ currentWindow: true });
      const tabsToSave = currentTabs.filter(
        (tab) =>
          tab.url &&
          !tab.url.startsWith('chrome://') &&
          !tab.url.startsWith('chrome-extension://') &&
          !tab.url.startsWith('edge://') &&
          !tab.url.startsWith('brave://')
      );
      await Storage.saveSession(contextNameInput.value, tabsToSave);
      contextNameInput.value = '';
      await updateTabCount();

      const tabIdsToClose = tabsToSave
        .map((tab) => tab.id)
        .filter((id) => typeof id === 'number');

      if (tabIdsToClose.length > 0) {
        try {
          await chrome.tabs.remove(tabIdsToClose);
        } catch (err) {
          // ignore
        }
      }

      await renderSessions();
    } catch (err) {
      alert('Gagal menyimpan tab');
    } finally {
      isSaving = false;
      saveBtn.disabled = false;
      saveBtn.innerHTML = saveBtnHTML;
      await updateTabCount();
    }
  });

  sessionsList.addEventListener('click', async (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === 'delete') {
      const card = btn.closest('.session-card');
      const nameEl = card ? card.querySelector('.session-name') : null;
      const name = nameEl ? nameEl.textContent : 'grup ini';
      pendingDeleteId = id;
      if (openDeleteModal(name)) {
        return;
      }
      if (confirm(`Hapus "${name}"?`)) {
        await Storage.deleteSession(id);
        await renderSessions();
      }
      return;
    } else if (action === 'restore') {
      const sessions = await Storage.getSessions();
      const session = sessions.find((s) => s.id === id);
      if (session && session.tabs.length > 0) {
        for (const tab of session.tabs) {
          chrome.tabs.create({ url: tab.url, pinned: tab.pinned });
        }
      }
      return;
    } else if (action === 'edit') {
      const sessions = await Storage.getSessions();
      const session = sessions.find((s) => s.id === id);
      if (!session) return;
      startInlineEdit(id, session.name);
      return;
    }
  });

  contextNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!isSaving) {
        saveBtn.click();
      }
    }
  });

  await updateTabCount();
  await renderSessions();
});
