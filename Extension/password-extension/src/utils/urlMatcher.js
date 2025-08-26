export function normalizeUrl(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace("www.", "");
  } catch {
    return "";
  }
}

export function matchCredential(currentUrl, credentials) {
  const hostname = normalizeUrl(currentUrl);
  return credentials.find((c) => normalizeUrl(c.url) === hostname);
}
