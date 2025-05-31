## 📎 Hiked.in | Link Sharing App

A pixel-perfect, responsive, and interactive link sharing application built using **Next.js (Pages Router)**, **JSX**, and **CSS Modules**.
This app mimics the UI from the provided Figma and includes CRUD functionality, drag-and-drop sorting, form validation, and mobile preview features.

---

### 🚀 Live Demo

👉 [Live Demo Link](https://your-app-url.netlify.app)
👉 [Video Walkthrough](https://your-video-link.com)

---

### 📂 Folder Structure

```
hiked-link-sharing-app/
├── public/                 # Static assets (icons, images)
├── pages/
│   ├── index.js            # Mobile preview screen
│   ├── dashboard.js        # Dashboard for managing links
│   └── api/links.js        # (Bonus) API for storing link data
├── components/
│   ├── Header.jsx
│   ├── LinkForm.jsx
│   ├── LinkCard.jsx
│   └── PreviewPhone.jsx
├── styles/
│   ├── globals.css
│   ├── Header.module.css
│   ├── LinkForm.module.css
│   └── LinkCard.module.css
├── utils/
│   └── validators.js
└── README.md
```

---

### 🛠️ Technologies Used

* **Next.js (Pages Router)**
* **JSX**
* **CSS Modules**
* **JavaScript (ES6)**
* **React Beautiful DnD** – For drag and drop
* **Axios** (optional, for full-stack)
* **HTML5 & Semantic Elements**
* **Responsive Design with Flexbox/Grid**

---

### ✅ Features

* ✅ Add, update, delete links
* ✅ Form validation (empty field, incorrect URL pattern)
* ✅ Drag and drop to reorder links
* ✅ Real-time preview inside a mobile device frame
* ✅ Fully responsive across screen sizes
* ✅ Accessibility: Focus rings, semantic HTML, ARIA support
* ✅ Hover and focus states for interactive elements

---

### 🔒 Bonus Features

* ✅ Backend API for persisting links (`pages/api/links.js`)
* ✅ User authentication (optional - using `next-auth`)
* ✅ Extra screens and modal transitions

---

### 📦 Installation & Run Locally

```bash
git clone https://github.com/Abhishek07788/Link-Sharing-App.git
cd link-sharing-app
npm install
npm run dev
```

Visit `http://localhost:3000` to open the app.

---

### 🧠 Assumptions & Decisions

* URL patterns are strictly validated for common platforms like GitHub, LinkedIn, YouTube, etc.
* Drag and drop is implemented using `react-beautiful-dnd` for better UX and performance.
* CSS Modules are used to scope styles component-wise.
* Data persistence is added as a bonus using API routes and local state.