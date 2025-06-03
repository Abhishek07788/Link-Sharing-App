# Link Sharing App

A full-stack **link-sharing application** built using **Next.js**, **Node.js**, and **MongoDB**. Users can register, login, and manage their platform links with drag-and-drop functionality.

---

## ✨ Features

- 🔐 User Authentication (Register/Login)
- 📌 Add links for predefined platforms
- ✅ Platform-specific URL validation
- 🎨 Auto-generated placeholders
- 🗑️ Remove links
- 🔃 Drag-and-drop reordering
- 💾 Persistent data storage with MongoDB
- 🚫 Maximum 4 platforms per user
- ⚠️ Visual error messages
- 🎯 Dynamic icons & styling
- 🔄 Real-time updates

---

## 🔧 Tech Stack

### Frontend
- **Next.js (Pages Router)**
- **React**
- **CSS Modules**
- **React DnD**
- **Axios**

### Backend
- **Node.js**
- **Express**
- **MongoDB**
- **JWT Authentication**
- **Bcrypt**

---

## 📁 Project Structure

```plaintext
.
├── Frontend/
│   ├── public/
│   │   └── images/
│   └── src/
│       ├── api/
│       │   ├── platformApis.js
│       │   └── userApis.js
│       ├── components/
│       │   ├── auth/
│       │   │   └── Register.jsx
│       │   └── links/
│       │       ├── CustomizeForm.jsx
│       │       ├── PhonePreview.jsx
│       │       └── index.js
│       ├── context/
│       │   └── authProvider.js
│       └── styles/
│           ├── Register.module.css
│           └── ... other styles
│
├── Backend/
│   ├── Routes/
│   │   ├── platforms.routes.js
│   │   └── user.routes.js
│   ├── Schema/
│   │   ├── platforms.schema.js
│   │   └── user.schema.js
│   └── index.js
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
```

### 2. Install dependencies
```bash
# Install frontend dependencies
cd Frontend
npm install

# Install backend dependencies
cd ../Backend
npm install
```

### 3. Set up environment variables
```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_ENDPOINT=http://localhost:8080/api

# Backend (.env)
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### 4. Start the servers
```bash
# Start backend server
cd Backend
npm start

# Start frontend development server
cd Frontend
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎯 Core Functionality

- **Authentication**
  - Register new users
  - Login existing users
  - JWT-based auth
  - Password encryption

- **Platform Management**
  - Add up to 4 platforms
  - Drag-and-drop reordering
  - Platform-specific validation
  - Real-time updates

- **Data Persistence**
  - MongoDB integration
  - User-specific data
  - Secure API endpoints

---

## 👨‍💻 Author

**Abhishek Solanki**  
[🌐 Portfolio](https://abhishek07788.github.io/) | [🐱 GitHub](https://github.com/Abhishek07788) | [💼 LinkedIn](http://www.linkedin.com/in/abhishekpratapsolanki)