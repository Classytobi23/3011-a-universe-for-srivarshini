/**
 * Asset URL Resolver for Local and GitHub Pages Deployments
 * Handles base path prefixing dynamically based on Vite's import.meta.env.BASE_URL
 * Safe for both Vite browser/bundler execution and Node.js server/test execution.
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  let baseUrl = '/';
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) {
      baseUrl = import.meta.env.BASE_URL;
    }
  } catch {}

  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}
