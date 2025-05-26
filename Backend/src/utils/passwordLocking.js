import crypto from "crypto";
const algorithm = "aes-256-cbc";
const secretKey = process.env.ENCRYPTION_SECRET; // Must be 32 bytes
const iv = crypto.randomBytes(16);

const encryptPassword = (password) => {
  try {
    const cipher = crypto.createCipheriv(
      algorithm,
      Buffer.from(secretKey, "hex"),
      iv
    );
    let encrypted = cipher.update(password);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Encryption failed");
  }
};
// Decryption process

const decryptPassword = (text) => {
  try {
    const [ivStr, encryptedData] = text.split(":");
    const iv = Buffer.from(ivStr, "hex");
    const encryptedText = Buffer.from(encryptedData, "hex");
    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(secretKey, "hex"),
      iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Decryption failed");
  }
};
export { encryptPassword, decryptPassword };
