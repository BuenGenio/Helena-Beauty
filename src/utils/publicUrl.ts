/** Public folder paths (e.g. `images/hero/x.jpg`) with Vite `base` for GH Pages. */
export function publicUrl(path: string): string {
  const clean = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${clean}`;
}
