````markdown
# Link Sharing App

A sleek and dynamic **link-sharing application** built using **Next.js (Pages Router)**, `react-dnd`, and `react-select`. Users can add, reorder, and customize links for different platforms (like LinkedIn, GitHub, etc.) and save them locally. 

## ✨ Features

- 📌 Add links for predefined platforms
- ✅ Platform-specific URL validation
- 🎨 Auto-generated placeholders
- 🗑️ Remove links
- 🔃 Drag-and-drop reordering (via `react-dnd`)
- 💾 Save & persist data using `localStorage`
- 🚫 Disables Add button when all platforms are added
- ❌ Save button disables if no links exist
- ✅ Visual error messages on invalid URLs
- ✅ Dynamic icons & styling using platform config

---

## 🔧 Tech Stack

- **Next.js (Pages Router)**
- **React**
- **CSS Modules**
- **React DnD** (for drag-and-drop)
- **React Select** (for custom dropdowns)
- **LocalStorage** (for persistence)

---

## 📁 Folder Structure

```plaintext
.
├── public/
│   └── images/
│       └── All svg icons
├── src/
    ├── components/
    │   ├── CopyableInput.jsx
    │   ├── CustomizeForm.jsx
    │   ├── Header.jsx
    │   ├── LinkCard.jsx
    │   ├── LinkItem.jsx
    │   ├── ParentContainer.jsx
    │   └── PhonePreview.jsx
    │
    ├── pages/
    │   ├── _app.js
    │   ├── _document.js
    │   ├── index.js
    │   └── profile.js
    │
    ├── styles/
    │   ├── CustomizeForm.module.css
    │   ├── globals.css
    │   ├── Header.module.css
    │   ├── ParentContainer.module.css
    │   └── PhonePreview.module.css
    │
    └── utils/
        └── config.js

````

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Abhishek07788/Link-Sharing-App.git
cd link-sharing-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Start the development server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🧠 How It Works

* Users can **add a new link** using the `+ Add new link` button.
* Each link includes:

  * A **platform dropdown** (`react-select`)
  * A **platform-specific placeholder**
  * **URL validation** using regex per platform
* **Drag-and-drop** support via `react-dnd`
* **Save** stores links to `localStorage`
* Only **unique platforms** are allowed

---

## 🖼️ Screenshot

<img width="1469" alt="Screenshot 2025-06-01 at 7 10 25 PM" src="https://github.com/user-attachments/assets/dd89d026-6031-42f3-936b-562fcc0f960f" />
<img width="1470" alt="Screenshot 2025-06-01 at 7 10 09 PM" src="https://github.com/user-attachments/assets/579e81ff-55e3-4b8d-b6b3-2583bac20b9e" />



---

## 👨‍💻 Author

* **Abhishek Solanki** – [Portfolio](https://abhishek07788.github.io/) | [GitHub](https://github.com/Abhishek07788) | [LinkedIn](http://www.linkedin.com/in/abhishekpratapsolanki)

```
