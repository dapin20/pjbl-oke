import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar - Klethisan Can's",
  description:
    "Buat akun Klethisan Can's untuk mulai berbelanja camilan favorit.",
};

export default function DaftarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
