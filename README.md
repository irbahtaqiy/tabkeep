<div align="center">

# tabkeep

**Simpan kumpulan tab berdasarkan konteks, nutup biar fokus, buka lagi kapan aja.**

Browser extension ringan & minimalis buat ngatur tab overload tanpa bikin berantakan.

[![GitHub stars](https://img.shields.io/github/stars/irbahtaqiy/tabkeep?style=flat-square&color=3b82f6)](https://github.com/irbahtaqiy/tabkeep/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/irbahtaqiy/tabkeep?style=flat-square&color=3b82f6)](https://github.com/irbahtaqiy/tabkeep/network/members)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-green?style=flat-square)](https://developer.chrome.com/docs/extensions/mv3/intro/)
</div>

## ✨ Kenapa tabkeep?

Kebanyakan orang nutup tab biar beres, tapi malah lupa link penting yang perlu dilanjutkan. 

**tabkeep** beda. Bukan buat ngarsip semua tab, tapi buat nyimpen *kumpulan tab buat misi tertentu*. Simpan, tutup, fokus. Buka kembali dengan satu klik.

## 🚀 Fitur

- **Simpan berdasarkan konteks** – Simpan semua tab di window aktif jadi satu grup dengan nama custom
- **Auto-close tabs** – Setelah disimpan, tab yang kamu simpan langsung ditutup biar browser tetep bersih
- **Restore dengan 1 klik** – Buka semua tab dalam grup persis seperti semula
- **Edit nama grup** – Ganti nama grup langsung dari popup tanpa keluar modal browser
- **Kelola grup** – Lihat, edit nama, hapus, atau buka grup yang udah kamu simpan
- **Custom modal konfirmasi** – Konfirmasi hapus grup tetap rapi di dalem popup
- **Local-first** – Semuanya disimpan di `chrome.storage.local`. Nggak perlu akun, nggak ada data yang dikirim ke server
- **Ringan & simpel** – Fokus ke `save` & `restore`, tanpa fitur berlebihan
- **Filter otomatis** – Ngilangin tab `chrome://`, `chrome-extension://`, dll biar tetep bersih

## 📸 Preview

> *Nanti bisa tambahin screenshot popup tabkeep disini kalo udah ada*

## 📦 Cara Install (Load Unpacked)

Karena belum dipublish ke Chrome Web Store, kamu bisa pasang langsung dari source code.

### Langkah-langkah

1. **Download** repo ini
   ```bash
   git clone https://github.com/irbahtaqiy/tabkeep.git
   ```
   Atau download ZIP lewat [halaman repo](https://github.com/irbahtaqiy/tabkeep/archive/refs/heads/main.zip), lalu ekstrak.

2. **Buka halaman extension**
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`

3. **Aktifin Developer mode** – Nyalain toggle di pojok kanan atas

4. **Load unpacked** – Klik `Load unpacked`, pilih folder `tabkeep` hasil ekstrak/clone

5. **Selesai** – Icon tabkeep langsung muncul di toolbar. Tinggal klik aja!

## 🎯 Cara Pakai

1. **Buka tab yang pengen disimpan** – Misalnya lagi research buat skripsi dengan 10 tab artikel
2. **Klik icon tabkeep** – Buka popup extension
3. **Kasih nama konteks** – Contoh: `Skripsi Bab 2`
4. **Klik "Simpan semua tab di window ini"** – Semua tab langsung tersimpan jadi satu grup, lalu otomatis tertutup
5. **Tutup tab-tabnya** – Bebaskan ruang biar browser lebih rapi & fokus
6. **Buka lagi kapan aja** – Tinggal klik `Buka` di grup yang kamu pilih, semua tab kebuka lagi persis semula

## 🛠️ Tech Stack

- [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/) – Standar terbaru Chrome Extension
- [Vanilla JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript) – Ringan, tanpa framework
- [Chrome Storage API](https://developer.chrome.com/docs/extensions/reference/storage/) – Penyimpanan lokal

## 🤝 Kontribusi

Kontribusi, issue, dan pull request selalu terbuka! 

Kalo ada ide, bug, atau fitur yang pengen ditambahin, feel free buat [buka issue](https://github.com/irbahtaqiy/tabkeep/issues).

## 📄 License

[MIT License](LICENSE) © 2025 [irbahtaqiy](https://github.com/irbahtaqiy)
