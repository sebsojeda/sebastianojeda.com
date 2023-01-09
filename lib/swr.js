/**
 *
 * @param  {any[]} args
 */
export default async function fetcher(...args) {
  const res = await fetch(...args);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}
