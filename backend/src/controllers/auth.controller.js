import bcrypt from "bcrypt";
import prisma from "../config/db.js";
import { generateToken } from "../utils/token.js";
import admin from "../config/firebase.js";
import validator from "validator";

//  Register Routes
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    
    // Validate email
   const isEmailValid = validator.isEmail(email);
   
   if(!isEmailValid){
    return res.status(400).json({ message: "Invalid email" });
   }

    // check user exist
    const existingUser = await prisma.User.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //firebase
    const userRecord = await admin.auth().createUser({
      email,
      password: hashedPassword,
    });

    // save user
    const user = await prisma.User.create({
      data: {
        email,
        password: hashedPassword,
        firebase_uid: userRecord.uid,
      },
    });

    // generate JWT
    const token = generateToken(user);

    // send cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // production → true
      sameSite: "lax",
    });

    res.json({ message: "User registered", user });
  } catch (error) {
    console.log("FULL ERROR 👉", error); // 👈 ये जरूरी है
    res.status(500).json({ error });
  }
};

//Login Routes
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // generate JWT
    const token = generateToken(user);

    // send cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // production → true
      sameSite: "lax",
    });

    res.json({
      message: "Login success",
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GOOGLE LOGIN (Firebase)
export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // verify firebase token
    const decoded = await admin.auth().verifyIdToken(token);

    const { uid, email } = decoded;

    // check user exist
    let user = await prisma.user.findUnique({
      where: { firebase_uid: uid },
    });

    // अगर user नहीं है → create करो
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          firebase_uid: uid,
        },
      });
    }

    // JWT generate
    const jwtToken = generateToken(user);

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.json({
      message: "Google login success",
      user,
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid Firebase token" });
  }
};
