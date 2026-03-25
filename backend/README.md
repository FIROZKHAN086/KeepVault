# KeepVault Backend

KeepVault is a secure, robust backend service designed to manage user authentication and document storage. It provides a RESTful API built with Node.js and Express, utilizing PostgreSQL for data persistence and Cloudinary for secure file storage.

## 🚀 Tech Stack

- **Framework**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: JWT (JSON Web Tokens), [Firebase Auth](https://firebase.google.com/) (for Google Login), and `bcrypt` for password hashing.
- **File Storage**: [Cloudinary](https://cloudinary.com/) (integrated via `multer` and `streamifier`)
- **Other Tools**: `cors`, `cookie-parser`, `dotenv`, `validator`

## 📁 Project Structure

```text
backend/
├── prisma/             # Prisma schema and migrations
├── src/
│   ├── config/         # Configuration files (Database, Firebase, Cloudinary)
│   ├── controllers/    # Route controllers (Auth, Documents)
│   ├── middleware/     # Custom middlewares (e.g., JWT Authentication, Multer)
│   ├── routes/         # Express route definitions
│   ├── utils/          # Utility functions (Token generation, blacklisting)
│   └── app.js          # Express application setup
├── .env                # Environment variables (not tracked by git)
├── package.json        # Project metadata and dependencies
└── server.js           # Main entry point to start the server
```

## ✨ Features

1. **User Authentication**:
   - Register with Email and Password (hashed securely with `bcrypt`).
   - Secure login generating HttpOnly cookies with JWTs.
   - Google OAuth integration using Firebase Admin SDK.
   - Logout functionality with stateless token blacklisting.
2. **Document Management**:
   - Securely upload files via `multer`.
   - Direct streaming to Cloudinary using `streamifier`.
   - Route protection ensuring only authenticated users can access or modify their documents.

## 🛠️ Installation & Setup

Follow these instructions to run the KeepVault backend locally.

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- PostgreSQL database
- Firebase Admin SDK Private Key (`.json` file)
- Cloudinary Account

### 2. Clone and Install
```bash
# Navigate to the backend directory
cd backend

# Install all dependencies
npm install
```

### 3. Environment Variables
Create a `.env` file in the root of the `backend` folder. You will need the following variables:

```env
PORT=5000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/keepvault?schema=public"

# JWT Secret for authentication
JWT_SECRET="your_super_secret_jwt_key"

# Cloudinary Setup
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Frontend URL for CORS
FRONTEND_URL="http://localhost:3000"
```

*Note: Ensure your Firebase Admin SDK credential file is correctly referenced in your codebase or placed in the working directory (e.g., `keepvault-firebase-adminsdk.json`).*

### 4. Database Setup (Prisma)
Initialize your PostgreSQL database and run the Prisma migrations:

```bash
npx prisma generate
npx prisma db push
```

### 5. Start the Server
Start the development server with Nodemon:

```bash
npm run dev
```

The server should now be running on `http://localhost:5000` (or whichever port is defined in your `.env` / `server.js`).

## 🔄 API Endpoints

### Authentication (`/api/auth`)
- `POST /register`: Create a new user account.
- `POST /login`: Authenticate an existing user and receive a JWT cookie.
- `POST /google`: Authenticate via Firebase Google Login token.
- `POST /logout`: Clear the authentication cookie and blacklist the JWT token.

### Documents (`/api/documents`)
*(Requires an active JWT token in the `token` cookie)*
- `GET /` : Fetch user documents.
- `POST /upload`: Upload a new document.
- `DELETE /:id`: Delete a specific document.

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
