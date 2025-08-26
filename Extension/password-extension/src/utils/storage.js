export async function savePassword(site, password) {
  const data = (await chrome.storage.local.get("passwords")) || {};
  const passwords = data.passwords || [];
  passwords.push({ site, password });
  await chrome.storage.local.set({ passwords });
}

export async function getPasswords() {
  const data = await chrome.storage.local.get("passwords");
  return data.passwords || [];
}
