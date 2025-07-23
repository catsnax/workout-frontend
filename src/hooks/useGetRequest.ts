export default async function useGetRequest(pk: string, url: string) {
  const res = await fetch(`${url}?pk=${encodeURIComponent(pk)}`);
  if (!res.ok) throw new Error("Failed to fetch exercises");
  const data = await res.json();
  return data;
}
