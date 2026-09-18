import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk - Klethisan Can's",
  description: "Masuk ke akun Klethisan Can's Anda untuk melanjutkan pesanan.",
};

export default function MasukLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
