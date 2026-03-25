import jwt from "jsonwebtoken";

export const tokenBlacklist = new Set();

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, firebase_uid: user.firebase_uid },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};