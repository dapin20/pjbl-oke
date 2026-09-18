import { createHash, randomBytes, randomUUID, scryptSync, timingSafeEqual } from "crypto";
import { getDb } from "./db";

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  whatsapp: string;
  passwordHash: string;
  imageUrl: string;
};

export const SESSION_COOKIE = "klethisan_session";

function normalizeIdentifier(identifier: string) {
  return identifier.trim().toLowerCase();
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(user: AuthUser, password: string) {
  const [salt, storedHash] = user.passwordHash.split(":");
  if (!salt || !storedHash) return false;
  const hash = scryptSync(password, salt, 64);
  const expected = Buffer.from(storedHash, "hex");
  return hash.length === expected.length && timingSafeEqual(hash, expected);
}

function rowToUser(row: Record<string, unknown>): AuthUser {
  return {
    id: String(row.id),
    fullName: String(row.full_name),
    email: String(row.email ?? ""),
    whatsapp: String(row.whatsapp ?? ""),
    passwordHash: String(row.password_hash),
    imageUrl: String(row.image_url ?? ""),
  };
}

export function findUser(identifier: string): AuthUser | undefined {
  const normalized = normalizeIdentifier(identifier);
  if (!normalized) return undefined;
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM users WHERE email = ? OR whatsapp = ?")
    .get(normalized, normalized) as Record<string, unknown> | undefined;
  return row ? rowToUser(row) : undefined;
}

export function findUserById(id: string): AuthUser | undefined {
  const row = getDb()
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(id) as Record<string, unknown> | undefined;
  return row ? rowToUser(row) : undefined;
}

export function createUser(input: {
  fullName: string;
  email?: string;
  whatsapp?: string;
  password: string;
}) {
  const email = normalizeIdentifier(input.email ?? "");
  const whatsapp = normalizeIdentifier(input.whatsapp ?? "");

  if (email && findUser(email)) throw new Error("EMAIL_EXISTS");
  if (whatsapp && findUser(whatsapp)) throw new Error("WHATSAPP_EXISTS");

  const user: AuthUser = {
    id: randomUUID(),
    fullName: input.fullName.trim(),
    email,
    whatsapp,
    passwordHash: hashPassword(input.password),
    imageUrl: "",
  };

  getDb()
    .prepare(
      "INSERT INTO users (id, full_name, email, whatsapp, password_hash, image_url) VALUES (?, ?, ?, ?, ?, ?)",
    )
    .run(user.id, user.fullName, user.email || null, user.whatsapp || null, user.passwordHash, null);

  return user;
}

export function updateUserProfileImage(userId: string, imageUrl: string) {
  getDb()
    .prepare("UPDATE users SET image_url = ? WHERE id = ?")
    .run(imageUrl || null, userId);
}

export function createSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  getDb()
    .prepare("INSERT INTO sessions (token, user_id) VALUES (?, ?)")
    .run(token, userId);
  return token;
}

export function getSessionUser(token: string | undefined | null): AuthUser | undefined {
  if (!token) return undefined;
  const db = getDb();
  const row = db
    .prepare("SELECT user_id FROM sessions WHERE token = ?")
    .get(token) as { user_id: string } | undefined;
  if (!row) return undefined;
  return findUserById(String(row.user_id));
}

export function destroySession(token: string | undefined | null) {
  if (!token) return;
  getDb().prepare("DELETE FROM sessions WHERE token = ?").run(token);
}
