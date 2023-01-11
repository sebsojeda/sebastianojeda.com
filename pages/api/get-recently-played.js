/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "method not allowed" });
  }

  const developerToken = "";
  const musicUserToken = "";

  const response = await fetch(
    "https://api.music.apple.com/v1/me/recent/played/tracks?limit=1",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${developerToken}`,
        "Music-User-Token": musicUserToken,
      },
      credentials: "same-origin",
    }
  );
  if (!response.ok) {
    return res.status(500).json({ message: "unable to get recently played" });
  }

  const data = await response.json();
  if (data.data.length === 0) {
    return res.status(200).json(null);
  }

  const attributes = data.data[0].attributes;

  return res.status(200).json({
    artwork: `${attributes.artwork.url}`.replace(/\/{w}x{h}bb.jpg/g, ""),
    artistName: attributes.artistName,
    name: attributes.name,
    albumName: attributes.albumName,
    url: attributes.url,
  });
}
