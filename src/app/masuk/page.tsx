"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { User, Lock, Eye, EyeOff, ArrowRight, Headphones } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export default function MasukPage() {
  return (
    <Suspense fallback={null}>
      <MasukForm />
    </Suspense>
  );
}

function MasukForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refresh } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrWa: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showRegisterHint, setShowRegisterHint] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        setShowRegisterHint(result.code === "ACCOUNT_NOT_FOUND");
        throw new Error(result.message);
      }
      setShowRegisterHint(false);

      await refresh();
      router.push(searchParams.get("next") || "/");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Gagal masuk.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-50 border-4 border-red-100 flex items-center justify-center overflow-hidden">
            <Image
              src="/Logo_klethisans.jpeg"
              alt="Klethisan Can's"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Masuk ke Klethisan Can&apos;s
        </h1>
        <p className="text-gray-600 text-center text-sm mb-6">
          Silakan masuk untuk melanjutkan pesanan Anda.
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-8 mb-8">
          <Link
            href="/masuk"
            className="text-red-900 font-semibold pb-2 border-b-2 border-red-900">
            Masuk
          </Link>
          <Link
            href="/daftar"
            className="text-gray-500 font-medium pb-2 border-b-2 border-transparent hover:text-gray-700 transition-colors">
            Daftar
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              <p>{error}</p>
              {showRegisterHint && (
                <p className="mt-1.5">
                  Belum punya akun?{" "}
                  <Link
                    href="/daftar"
                    className="font-semibold underline hover:text-red-900">
                    Daftar sekarang
                  </Link>
                </p>
              )}
            </div>
          )}
          {/* Email or WhatsApp */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email atau WhatsApp
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={18} />
              </div>
              <input
                type="text"
                name="emailOrWa"
                value={formData.emailOrWa}
                onChange={handleChange}
                placeholder="Masukkan email atau no. WA"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-100 border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-red-900 focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                Kata Sandi
              </label>
              <Link
                href="/lupa-kata-sandi"
                className="text-sm text-red-900 font-medium hover:underline">
                Lupa kata sandi?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3.5 bg-gray-100 border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-red-900 focus:bg-white transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-900 hover:bg-red-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-900/20 mt-2">
            {isSubmitting ? "Memproses..." : "Masuk Sekarang"}
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Help Box */}
        <div className="mt-6 bg-gray-50 rounded-xl p-4 flex items-center justify-between border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
              <Headphones size={20} className="text-red-900" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Butuh bantuan pesanan?</p>
              <p className="text-sm font-semibold text-gray-900">
                CS WhatsApp 24 Jam
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/6285739434388"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-red-900 hover:underline">
            Hubungi
          </a>
        </div>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Belum punya akun?{" "}
          <Link
            href="/daftar"
            className="text-red-900 font-semibold hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </div>

      {/* Copyright */}
      <p className="text-center text-xs text-gray-500 mt-6">
        © Klethisan Can&apos;s. Camilan Gurih, Segar, & Hadiah Istimewa.
      </p>
    </div>
  );
}
