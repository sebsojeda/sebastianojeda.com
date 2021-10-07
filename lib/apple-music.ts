import { importPKCS8 } from "jose/key/import";
import { SignJWT } from "jose/jwt/sign";
import { supabase } from "./supabase";

const ALG = process.env.APPLE_MUSIC_ALG || "";
const PKCS8 = process.env.APPLE_MUSIC_PKCS8 || "";
const TEAM_ID = process.env.APPLE_MUSIC_TEAM_ID || "";
const KEY_ID = process.env.APPLE_MUSIC_KEY_ID || "";
const EXPIRATION = process.env.APPLE_MUSIC_TOKEN_EXPIRATION || "";

const RECENTLY_PLAYED_ENDPOINT =
  "https://api.music.apple.com/v1/me/recent/played/tracks?limit=1";
const DEVELOPER_TOKEN_NAME = "apple_developer_token";
const MUSIC_USER_TOKEN_NAME = "apple_music_user_token";

export async function getMusicUserToken() {
  const { data, error } = await supabase
    .from("tokens")
    .select("name, value")
    .eq("name", MUSIC_USER_TOKEN_NAME);
  if (error) {
    throw new Error(error.message);
  }
  return data ? data[0] : null;
}

export async function createMusicUserToken(token: string) {
  const { data, error } = await supabase
    .from("tokens")
    .insert([{ name: MUSIC_USER_TOKEN_NAME, value: token }]);
  if (error) {
    throw new Error(error.message);
  } else {
    return data ? data[0] : null;
  }
}

export async function deleteMusicUserToken() {
  await supabase.from("tokens").delete().eq("name", MUSIC_USER_TOKEN_NAME);
}

export async function getDeveloperToken() {
  const { data, error } = await supabase
    .from("tokens")
    .select("name, value")
    .eq("name", DEVELOPER_TOKEN_NAME);
  if (error) {
    throw new Error(error.message);
  }
  return data ? data[0] : null;
}

export async function createDeveloperToken() {
  const ecPrivateKey = await importPKCS8(PKCS8, ALG);
  const jwt = await new SignJWT({ iss: TEAM_ID })
    .setProtectedHeader({ alg: ALG, kid: KEY_ID })
    .setIssuedAt()
    .setExpirationTime(EXPIRATION)
    .sign(ecPrivateKey);
  const { data, error } = await supabase
    .from("tokens")
    .insert([{ name: DEVELOPER_TOKEN_NAME, value: jwt }]);
  if (error) {
    throw new Error(error.message);
  } else {
    return data ? data[0] : null;
  }
}

export async function deleteDeveloperToken() {
  await supabase.from("tokens").delete().eq("name", DEVELOPER_TOKEN_NAME);
}

export async function getRecentlyPlayed(): Promise<any> {
  const developerToken = await getDeveloperToken();
  const musicUserToken = await getMusicUserToken();
  const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${developerToken.value}`,
      "Music-User-Token": musicUserToken.value,
    },
    credentials: "same-origin",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}
