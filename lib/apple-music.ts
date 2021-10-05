import { importPKCS8 } from "jose/key/import";
import { SignJWT } from "jose/jwt/sign";
import { supabase } from "./supabase";

const ALG = process.env.APPLE_MUSIC_ALG || "";
const PKCS8 = process.env.APPLE_MUSIC_PKCS8 || "";
const TEAM_ID = process.env.APPLE_MUSIC_TEAM_ID || "";
const KEY_ID = process.env.APPLE_MUSIC_KEY_ID || "";
const EXPIRATION = process.env.APPLE_MUSIC_TOKEN_EXPIRATION || "";

const RECENTLY_PLAYED_ENDPOINT =
  "https://api.music.apple.com/v1/me/recent/played/tracks?limit=1&types=songs";
const TOKEN_NAME = "apple_developer_token";

async function getOrCreateDeveloperToken() {
  const { data, error } = await supabase
    .from("tokens")
    .select("value")
    .eq("name", TOKEN_NAME);
  if (error) {
    throw new Error(JSON.stringify(error));
  } else if (data && data.length != 0) {
    return data[0].value;
  } else {
    const ecPrivateKey = await importPKCS8(PKCS8, ALG);
    const jwt = await new SignJWT({ iss: TEAM_ID })
      .setProtectedHeader({ alg: ALG, kid: KEY_ID })
      .setIssuedAt()
      .setExpirationTime(EXPIRATION)
      .sign(ecPrivateKey);
    const { data, error } = await supabase
      .from("tokens")
      .insert([{ name: TOKEN_NAME, value: jwt }]);
    if (error) {
      throw new Error(JSON.stringify(error));
    } else {
      return data ? data[0].value : "";
    }
  }
}

async function deleteDeveloperToken() {
  await supabase.from("tokens").delete().match({ name: TOKEN_NAME });
}

export async function getRecentlyPlayed(): Promise<any> {
  const jwt = await getOrCreateDeveloperToken();
  let response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  let retries = 3;
  while (retries > 0) {
    if (response.ok) {
      return await response.json();
    }
    response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: jwt,
      },
    });
    retries--;
  }
  throw new Error(response.statusText);
}
