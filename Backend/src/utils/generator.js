import crypto from "crypto"

const secret = crypto.randomBytes(32).toString("hex");
console.log("32-byte secret (hex):", secret);