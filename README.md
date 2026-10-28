# tabkeep

Browser extension buat nyimpen kumpulan tab berdasarkan konteks dan restore kapan aja.

Bukan arsip semua tab, tapi kumpulan tab buat misi tertentu. Nutup biar fokus, buka lagi pas dibutuhin.

## Fitur

- **Simpan berdasarkan konteks** - Simpan semua tab di window aktif jadi satu grup dengan nama custom
- **Restore dengan 1 klik** - Buka semua tab dalam grup persis kayak semula
- **Kelola grup** - Lihat, hapus grup yang udah nggak dipake
- **Local-first** - Data disimpan di `chrome.storage.local`, nggak perlu login
- **Ringan & simpel** - Fokus ke "save & restore", tanpa fitur berlebihan

## Cara Pakai

1. Clone repo ini
2. Buka `chrome://extensions/` (atau `edge://extensions/`)
3. Aktifin `Developer mode`
4. Klik `Load unpacked` dan pilih folder `tabkeep`
5. Klik icon tabkeep di toolbar, kasih nama konteks, simpan tab kamu

## Tech Stack

- Manifest V3
- Vanilla JS (HTML, CSS)
- Chrome Storage API

## Roadmap

- [ ] Edit nama grup
- [ ] Buka grup di window baru
- [ ] Auto-close tab setelah disimpan
- [ ] Support Firefox
- [ ] Icons

## License

MIT
