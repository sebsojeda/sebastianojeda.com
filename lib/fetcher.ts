export default function fetcher(...args: [any, any?]) {
  return fetch(...args).then((res) => res.json());
}
