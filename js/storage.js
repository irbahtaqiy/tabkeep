const Storage = {
  async getSessions() {
    const result = await chrome.storage.local.get(['sessions']);
    return result.sessions || [];
  },

  async saveSession(name, tabs) {
    const sessions = await this.getSessions();
    const newSession = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: name.trim() || `Grup ${sessions.length + 1}`,
      tabs: tabs.map(tab => ({
        url: tab.url,
        title: tab.title,
        pinned: tab.pinned
      })),
      createdAt: new Date().toISOString(),
      tabCount: tabs.length
    };
    sessions.unshift(newSession);
    await chrome.storage.local.set({ sessions });
    return newSession;
  },

  async deleteSession(id) {
    const sessions = await this.getSessions();
    const filtered = sessions.filter(s => s.id !== id);
    await chrome.storage.local.set({ sessions: filtered });
    return filtered;
  }
};
