import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-red-950 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Klethisan Can&apos;s</h3>
            <p className="text-gray-300 mb-4">
              Camilan Favorit, Selalu Fresh & Terjangkau
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">
                  Kec. Kedungkandang, Kota Malang, Jawa Timur
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-5 h-5" />
                <span className="text-sm">0857-3943-4388</span>
              </div>
            </div>
          </div>

          {/* Belanja */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Belanja</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/katalog"
                  className="text-gray-300 hover:text-white transition">
                  Semua Camilan
                </Link>
              </li>
              <li>
                <Link
                  href="/katalog?category=basreng"
                  className="text-gray-300 hover:text-white transition">
                  Basreng
                </Link>
              </li>
              <li>
                <Link
                  href="/katalog?category=kering"
                  className="text-gray-300 hover:text-white transition">
                  Jajanan Kering
                </Link>
              </li>
              <li>
                <Link
                  href="/katalog?category=kekinian"
                  className="text-gray-300 hover:text-white transition">
                  Cemilan Kekinian
                </Link>
              </li>
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Bantuan</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/cara-beli"
                  className="text-gray-300 hover:text-white transition">
                  Cara Beli di Toko
                </Link>
              </li>
              <li>
                <Link
                  href="/lokasi"
                  className="text-gray-300 hover:text-white transition">
                  Lokasi & Jam Kerja
                </Link>
              </li>
              <li>
                <Link
                  href="/stok"
                  className="text-gray-300 hover:text-white transition">
                  Cek Stok Produk
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-white transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/tentang"
                  className="text-gray-300 hover:text-white transition">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/kontak"
                  className="text-gray-300 hover:text-white transition">
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/testimoni"
                  className="text-gray-300 hover:text-white transition">
                  Testimoni
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-red-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2026 Klethisan Can&apos;s. Hak cipta dilindungi.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/syarat"
              className="text-sm text-gray-400 hover:text-white transition">
              Syarat & Ketentuan
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              href="/privasi"
              className="text-sm text-gray-400 hover:text-white transition">
              Kebijakan Privasi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
