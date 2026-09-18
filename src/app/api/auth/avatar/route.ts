import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "node:path";
import {
  SESSION_COOKIE,
  getSessionUser,
  updateUserProfileImage,
} from "@/lib/auth-store";

export const runtime = "nodejs";

const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(request: Request) {
  const user = getSessionUser(cookies().get(SESSION_COOKIE)?.value);
  if (!user) {
    return NextResponse.json(
      { message: "Anda harus login terlebih dahulu." },
      { status: 401 },
    );
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "File tidak valid." }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { message: "Ukuran foto maksimal 2 MB." },
      { status: 400 },
    );
  }

  const extension = ALLOWED_TYPES[file.type];
  if (!extension) {
    return NextResponse.json(
      { message: "Format foto harus JPG, PNG, WEBP, atau GIF." },
      { status: 400 },
    );
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const filename = `${user.id}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);

  // Hapus foto lama jika ekstensinya berbeda.
  if (user.imageUrl && !user.imageUrl.endsWith(`.${extension}`)) {
    const oldPath = path.join(process.cwd(), "public", user.imageUrl.replace(/^\//, ""));
    await unlink(oldPath).catch(() => {});
  }

  const imageUrl = `/uploads/${filename}`;
  updateUserProfileImage(user.id, imageUrl);

  return NextResponse.json({ imageUrl });
}
