# Fitness Dashboard - 健身紀錄管理平台

## 📌 專案簡介

本專案為一個專屬於健身愛好者的個人化健身數據管理平台，提供使用者每日健身與飲食記錄功能，結合視覺化圖表呈現訓練與飲食趨勢，幫助使用者有效追蹤自身健身進度。

✅ 使用者可以：

- 註冊 / 登入帳號
- 新增、編輯、刪除健身紀錄
- 儲存體重、飲食等個人數據
- 視覺化統計（體重趨勢 / 飲食熱量 / 訓練次數）

---

## 🚀 Demo 網址

👉 開發中...... <!--[Fitness Dashboard Demo]() 這裡之後補上網址 -->

---

## 🛠️ 技術使用

| 技術         | 說明                               |
| ------------ | ---------------------------------- |
| React        | 前端框架，建構元件化 SPA 架構      |
| Firebase     | Auth 驗證 / Firestore 雲端資料儲存 |
| React Router | 路由管理（登入 / 首頁 / 個人頁）   |
| Chart.js     | 視覺化圖表（體重、熱量、訓練次數） |
| SCSS         | RWD 響應式樣式與動畫效果           |
| Git / GitHub | 版本管理與部署                     |

---

## 📂 專案架構

```
src
├── components
│   ├── Card.jsx
│   ├── Chart.jsx
│   └── Sidebar.jsx
├── hooks
│   └── useAuth.js
├── pages
│   ├── Dashboard.jsx
│   └── Login.jsx
├── services
│   └── firebase.js
├── styles
│   ├── index.scss
│   └── login.scss
├── App.jsx
└── main.jsx
```

---

## 📸 預覽畫面

### 🔐 登入 / 註冊頁（Login Page）

使用者可透過 Email / Password 註冊或登入，登入後導向 Dashboard。  
具備基本的「記住我」、忘記密碼等提示，符合一般使用者習慣的登入體驗。

![Login Page](./public/assets/Login-intro.png)

---

## 🔑 功能說明（🧑🏻‍💻 開發中....）

| 功能                           | 狀態      |
| ------------------------------ | --------- |
| 註冊 / 登入 / 登出             | ✅ 已完成 |
| 健身紀錄（新增 / 編輯 / 刪除） | ⏳ 製作中 |
| 飲食紀錄（新增 / 編輯 / 刪除） | ⏳ 製作中 |
| 個人資料管理                   | ⏳ 製作中 |
| 體重、熱量統計圖表             | ⏳ 製作中 |
| 手機 / 桌機 RWD 完整支援       | ⏳ 製作中 |

---

## 🧑‍💻 使用方式

```bash
# clone
git clone https://github.com/freddy990117/Fitness-Dashboard.git

# install
npm install

# run
npm run dev
```

---

## 🛠 開發者筆記

- 強化對 Jest、Firebase Auth / Firestore 實戰應用能力
- 優化元件化思維、狀態管理、路由管理
- 從 UI / UX 出發，設計更貼近健身使用情境的視覺呈現
- 使用 Git Flow 流程規劃，確保開發穩定性與維護性

---

## 📃 License

此專案僅用於個人學習與展示，無商業用途。

---

## 🙌 作者

Created by **Lee Jay 張立杰**  
轉職中前端工程師 🧑🏻‍💻
