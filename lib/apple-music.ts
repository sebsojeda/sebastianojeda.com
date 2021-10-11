import { importPKCS8 } from "jose/key/import";
import { SignJWT } from "jose/jwt/sign";
import { supabase } from "./supabase";

const PKCS8 = process.env.APPLE_MUSIC_PKCS8 ?? "";
const KEY_ID = process.env.APPLE_MUSIC_KEY_ID ?? "";

const EXPIRATION = "180d";
const ALG = "es256";
export const TEAM_ID = "ns4695lqpz";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.music.apple.com/v1/me/recent/played/tracks?limit=1";
const DEVELOPER_TOKEN_NAME = "apple_developer_token";
const MUSIC_USER_TOKEN_NAME = "apple_music_user_token";

export async function getMusicUserToken() {
  const { data, error } = await supabase
    .from("tokens")
    .select("value")
    .eq("name", MUSIC_USER_TOKEN_NAME);
  if (error) {
    return { data: null, error };
  }
  if (!data || data.length == 0) {
    return { data: null, error: new Error("Unable to get music user token") };
  }
  return { data: { ...data[0] }, error: null };
}

export async function createMusicUserToken(token: string) {
  const { data, error } = await supabase
    .from("tokens")
    .insert([{ name: MUSIC_USER_TOKEN_NAME, value: token }]);
  if (error) {
    return { data: null, error };
  }
  if (!data || data.length == 0) {
    return {
      data: null,
      error: new Error("Unable to create music user token"),
    };
  }
  return { data: { ...data[0] }, error: null };
}

export async function deleteMusicUserToken() {
  const { error } = await supabase
    .from("tokens")
    .delete()
    .eq("name", MUSIC_USER_TOKEN_NAME);
  return { error };
}

export async function getDeveloperToken() {
  const { data, error } = await supabase
    .from("tokens")
    .select("value")
    .eq("name", DEVELOPER_TOKEN_NAME);
  if (error) {
    return { data: null, error };
  }
  if (!data || data.length == 0) {
    return { data: null, error: new Error("Unable to get developer token") };
  }
  return { data: { ...data[0] }, error: null };
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
    return { data: null, error };
  }
  if (!data || data.length == 0) {
    return { data: null, error: new Error("Unable to insert developer token") };
  }
  return { data: { ...data[0] }, error: null };
}

export async function deleteDeveloperToken() {
  const { error } = await supabase
    .from("tokens")
    .delete()
    .eq("name", DEVELOPER_TOKEN_NAME);
  return { error };
}

export async function getMusicTokens() {
  const { data: developerToken, error: developerTokenError } =
    await getDeveloperToken();
  if (developerTokenError) {
    return { data: null, error: developerTokenError };
  }
  const { data: musicUserToken, error: musicUserTokenError } =
    await getMusicUserToken();
  if (musicUserTokenError) {
    return { data: null, error: musicUserTokenError };
  }
  return {
    data: {
      musicUserToken: musicUserToken.value,
      developerToken: developerToken.value,
    },
    error: null,
  };
}

export async function getRecentlyPlayed() {
  const { data: tokens, error } = await getMusicTokens();
  if (error) {
    return { data: null, error };
  }
  const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokens?.developerToken}`,
      "Music-User-Token": tokens?.musicUserToken,
    },
    credentials: "same-origin",
  });
  if (!response.ok) {
    return { data: null, error: new Error("Unable to get recently played") };
  }
  const data = await response.json();
  return { data: data.data, error: null };
}