export const API_BASE = import.meta.env.VITE_API_URL ?? "";

export async function apiFetch(path: string, opts?: RequestInit) {
  const base = API_BASE || "";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = base ? base.replace(/\/$/, "") + normalizedPath : normalizedPath;

  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  // attempt to parse json, fall back to text
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  return res.text();
}