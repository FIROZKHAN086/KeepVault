# KeepVault

KeepVault is a secure, modern document management and storage solution. It allows users to upload, manage, and share documents with ease, featuring robust authentication and Cloudinary-powered storage.

## 🚀 Technologies Used

### Frontend
- **Framework**: [Next.js 15+](https://nextjs.org/) (React 19)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) (RTK Query)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Auth Integration**: [Firebase SDK](https://firebase.google.com/docs/auth) (Google Login)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) using [Prisma ORM](https://www.prisma.io/)
- **Storage**: [Cloudinary](https://cloudinary.com/) (Media Management)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- **File Handling**: [Multer](https://github.com/expressjs/multer)
- **Security**: [BCrypt](https://github.com/kelektiv/node.bcrypt.js) for password hashing

---

## 🛠️ API Documentation

The backend API is accessible at: `https://keepvault-backend.firozkhan.site/api`

### 1. Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Description | Body (JSON) |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new user | `{ "email": "...", "password": "..." }` |
| `POST` | `/login` | Login with email/password | `{ "email": "...", "password": "..." }` |
| `POST` | `/google` | Login via Firebase Google Auth | `{ "token": "FIREBASE_ID_TOKEN" }` |
| `POST` | `/logout` | Logout (clears session cookie) | N/A |
| `GET` | `/me` | Get current user profile | N/A (Requires Auth) |

### 2. Document Endpoints (`/api/documents`)

| Method | Endpoint | Description | Data Type | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/upload` | Upload a new document | `FormData` | Yes |
| `GET` | `/get` | Get all documents | N/A | Yes |
| `GET` | `/get/:id` | Get document by ID | N/A | Yes |
| `GET` | `/get/user/:userId` | Get documents by User ID | N/A | Yes |
| `PUT` | `/edit/:id` | Update document/file | `FormData` | Yes |
| `DELETE` | `/delete/:id` | Delete document | N/A | Yes |

---

## 📡 Sending Data to Backend

### 1. Sending Body Data (JSON)
For authentication and basic data, use standard JSON.
```javascript
// Example: Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
```

### 2. Sending Files (FormData)
For document uploads and edits, use `FormData`. **Do NOT set the Content-Type header manually** when sending FormData; the browser will set it automatically with the correct boundary.
```javascript
// Example: Uploading a file
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('name', 'My Document');

const response = await fetch('/api/documents/upload', {
  method: 'POST',
  body: formData,
});
```

---

## 🔐 Authentication & Security

### Token Handling
KeepVault uses **HttpOnly Cookies** for security. 
- When you login, the server sends a `Set-Cookie` header with a JWT.
- For all subsequent requests, you **must** include credentials.

### Sending Requests with Cookies (Client-side)
If you are using `fetch`, you must set `credentials: 'include'`:
```javascript
fetch('/api/documents/get', {
  credentials: 'include' // Crucial for sending the auth token cookie
})
```
*Note: Our Redux Toolkit (RTK Query) setup already has `credentials: "include"` configured in `apiSlice.ts`.*

### Authorization Flow
1. User logs in.
2. Server generates a JWT and sends it as an `httpOnly` cookie named `token`.
3. Browser automatically attaches this cookie to requests to the same domain.
4. Backend `authMiddleware` verifies the token before processing protected routes.

---

## 🏗️ Development Setup

1. **Clone the repo**: `git clone ...`
2. **Install dependencies**:
   - Backend: `cd backend && npm install`
   - Frontend: `cd client && npm install`
3. **Environment Variables**: Create `.env` files based on the project requirements (Cloudinary, Database URL, Firebase Config).
4. **Run Development Server**:
   - Backend: `npm run dev`
   - Frontend: `npm run dev`
