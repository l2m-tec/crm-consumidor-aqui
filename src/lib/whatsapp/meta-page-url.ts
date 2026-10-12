/** Keep bearer tokens on Meta's Graph API when following pagination links. */
export function isTrustedMetaPageUrl(rawUrl: string, version: string): boolean {
  try {
    const url = new URL(rawUrl)
    return url.origin === 'https://graph.facebook.com' &&
      url.pathname.startsWith(`/${version}/`) &&
      url.username === '' && url.password === ''
  } catch {
    return false
  }
}
