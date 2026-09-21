/**
 * GitHub Pages project URL is:
 * https://subashsekar.github.io/cinematic_version/
 *
 * Local `npm run dev` keeps paths at `/` (no prefix).
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path: string): string {
  if (!path) return path;
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!BASE_PATH) return normalized;
  return `${BASE_PATH}${normalized}`;
}
