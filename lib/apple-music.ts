import prisma from "./prisma";

const RECENTLY_PLAYED_ENDPOINT =
  "https://api.music.apple.com/v1/me/recent/played/tracks?limit=1";
const DEVELOPER_TOKEN_NAME = "apple_developer_token";
const MUSIC_USER_TOKEN_NAME = "apple_music_user_token";

export async function getMusicUserToken() {
  const data = await prisma.tokens.findUnique({
    where: { name: MUSIC_USER_TOKEN_NAME },
  });
  if (!data) {
    return { data: null, error: new Error("Unable to get music user token") };
  }
  return { data: { ...data }, error: null };
}

export async function createOrUpdateMusicUserToken(token: string) {
  const data = await prisma.tokens.upsert({
    where: { name: MUSIC_USER_TOKEN_NAME },
    update: { value: token },
    create: { name: MUSIC_USER_TOKEN_NAME, value: token },
  });
  if (!data) {
    return {
      data: null,
      error: new Error("Unable to upsert music user token"),
    };
  }
  return { data: { ...data }, error: null };
}

export async function getDeveloperToken() {
  const data = await prisma.tokens.findUnique({
    where: { name: DEVELOPER_TOKEN_NAME },
  });
  if (!data) {
    return { data: null, error: new Error("Unable to get developer token") };
  }
  return { data: { ...data }, error: null };
}

export async function getRecentlyPlayed() {
  const { data: developerToken, error: developerTokenError } =
    await getDeveloperToken();
  if (!developerToken || developerTokenError) {
    return { data: null, error: developerTokenError };
  }
  const { data: musicUserToken, error: musicUserTokenError } =
    await getMusicUserToken();
  if (!musicUserToken || musicUserTokenError) {
    return { data: null, error: musicUserTokenError };
  }
  const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${developerToken.value}`,
      "Music-User-Token": musicUserToken.value,
    },
    credentials: "same-origin",
  });
  if (!response.ok) {
    return { data: null, error: new Error("Unable to get recently played") };
  }
  const data = await response.json();
  if (data.data.length === 0) {
    return { data: null, error: null };
  }
  return { data: { ...data.data[0].attributes }, error: null };
}
