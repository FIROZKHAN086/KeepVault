import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();


const algorithm = "aes-256-cbc";
const secretKey = process.env.CRYPTO_SECRET; 

export const encrypt = (text) => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secretKey),
    iv
  );

  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

export const decrypt = (encryptedText) => {
  const parts = encryptedText.split(":");
  const iv = Buffer.from(parts[0], "hex");
  const encryptedData = Buffer.from(parts[1], "hex");

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    iv
  );

  let decrypted = decipher.update(encryptedData);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};