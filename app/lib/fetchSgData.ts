export async function fetchSgData<T>(url: string): Promise<T> {
  const res = await fetch(`https://my-strapi-project-j0s0.onrender.com/api/${url}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const json = await res.json();
  return json.data;
}