import { importPKCS8, SignJWT } from "jose";
import client from "@prisma/client";

const PKCS8 = process.env.APPLE_MUSIC_PKCS8 ?? "";

const EXPIRATION = "180d";
const ALG = "ES256";

const KEY_ID = "668D538MNA";
const TEAM_ID = "ns4695lqpz";
const DEVELOPER_TOKEN_NAME = "apple_developer_token";
const MUSIC_USER_TOKEN_NAME = "apple_music_user_token";

async function generateTokens() {
  const prisma = new client.PrismaClient();
  const ecPrivateKey = await importPKCS8(PKCS8, ALG);
  const jwt = await new SignJWT({ iss: TEAM_ID })
    .setProtectedHeader({ alg: ALG, kid: KEY_ID })
    .setIssuedAt()
    .setExpirationTime(EXPIRATION)
    .sign(ecPrivateKey);
  await prisma.tokens.upsert({
    where: { name: DEVELOPER_TOKEN_NAME },
    update: { value: jwt },
    create: { name: DEVELOPER_TOKEN_NAME, value: jwt },
  });
  await prisma.tokens.upsert({
    where: { name: MUSIC_USER_TOKEN_NAME },
    update: {},
    create: { name: MUSIC_USER_TOKEN_NAME, value: "" },
  });
}

generateTokens();
