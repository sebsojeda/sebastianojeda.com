/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
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
          res.status(500).json({ message: "unable to get recently played" });
          return;
        }
        const data = await response.json();
        if (data.data.length === 0) {
          res.status(200).json(null);
          return;
        }
        const attributes = data.data[0].attributes;
        res.status(200).json({
          artwork: `${attributes.artwork.url}`.replace(/\/{w}x{h}bb.jpg/g, ""),
          artistName: attributes.artistName,
          name: attributes.name,
          albumName: attributes.albumName,
          url: attributes.url,
        });
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ message: "error fetching recently played" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}