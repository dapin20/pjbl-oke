"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingCart, User, Search } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/katalog") {
      return pathname === "/" || pathname.startsWith("/katalog");
    }
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-900 bg-white shrink-0">
              <Image
                src="/Logo_klethisans.jpeg"
                alt="Klethisan Can's logo"
                width={40}
                height={40}
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xl font-bold text-red-900">
              Klethisan Can&apos;s
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/katalog"
              className={
                isActive("/katalog")
                  ? "text-red-900 font-semibold hover:text-red-700 transition"
                  : "text-gray-700 hover:text-red-900 transition"
              }>
              Katalog
            </Link>
            <Link
              href="/pesanan"
              className={
                isActive("/pesanan")
                  ? "text-red-900 font-semibold hover:text-red-700 transition"
                  : "text-gray-700 hover:text-red-900 transition"
              }>
              Pesanan Saya
            </Link>
            <Link
              href="/tentang"
              className={
                isActive("/tentang")
                  ? "text-red-900 font-semibold hover:text-red-700 transition"
                  : "text-gray-700 hover:text-red-900 transition"
              }>
              Tentang Kami
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition relative">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
            <Link
              href="/profil"
              className="p-2 hover:bg-gray-100 rounded-full transition inline-flex"
              aria-label="Profil pengguna">
              <User className="w-6 h-6 text-gray-700" />
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="w-6 h-0.5 bg-gray-700 mb-1"></div>
              <div className="w-6 h-0.5 bg-gray-700 mb-1"></div>
              <div className="w-6 h-0.5 bg-gray-700"></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="mb-4">
              <SearchBar />
            </div>
            <nav className="flex flex-col space-y-4">
              <Link
                href="/katalog"
                className={
                  isActive("/katalog")
                    ? "text-red-900 font-semibold"
                    : "text-gray-700"
                }>
                Katalog
              </Link>
              <Link
                href="/pesanan"
                className={
                  isActive("/pesanan")
                    ? "text-red-900 font-semibold"
                    : "text-gray-700"
                }>
                Pesanan Saya
              </Link>
              <Link
                href="/tentang"
                className={
                  isActive("/tentang")
                    ? "text-red-900 font-semibold"
                    : "text-gray-700"
                }>
                Tentang Kami
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
