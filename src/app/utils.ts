export function buildQueryString(options: { [key: string]: string }): string {
  const params = new URLSearchParams();
  Object.entries(options).forEach(([key, value]) => {
    params.set(key, value);
  });
  return `?${params.toString()}`;
}
