import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const algorithm = "aes-256-cbc";

// ✅ hex → buffer (correct)
const secretKey = Buffer.from(process.env.CRYPTO_SECRET, "hex");

// ✅ Encrypt
export const encrypt = (text) => {
  try {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(
      algorithm,
      secretKey, 
      iv
    );

    let encrypted = cipher.update(text, "utf8", "hex"); 
    encrypted += cipher.final("hex");

    return iv.toString("hex") + ":" + encrypted;

  } catch (error) {
    console.log("ENCRYPT ERROR ", error.message);
    return null;
  }
};

// ✅ Decrypt (safe version)
export const decrypt = (encryptedText) => {
  try {
    if (!encryptedText) return null;

    const parts = encryptedText.split(":");

    if (parts.length !== 2) return encryptedText; // fallback

    const iv = Buffer.from(parts[0], "hex");
    const encryptedData = parts[1];

    const decipher = crypto.createDecipheriv(
      algorithm,
      secretKey, 
      iv
    );

    let decrypted = decipher.update(encryptedData, "hex", "utf8"); 
    decrypted += decipher.final("utf8");

    return decrypted;

  } catch (error) {
    console.log("DECRYPT ERROR ", error.message);
    return encryptedText; 
  }
};