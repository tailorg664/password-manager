function passwordGenerator(
  length,
  options = { uppercase, lowercase, numbers, symbols }
) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{};:,.<>/?";

  let characters = "";
  if (options.lowercase) characters += lowercase;
  if (options.uppercase) characters += uppercase;
  if (options.numbers) characters += numbers;
  if (options.symbols) characters += symbols;

  if (characters.length === 0) return "";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIdx = Math.floor(Math.random() * characters.length);
    password += characters[randomIdx];
  }

  return password;
}
export default passwordGenerator;