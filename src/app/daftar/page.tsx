"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import {
  User,
  AtSign,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

export default function DaftarPage() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    emailOrWa: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!agreed) {
      setError("Anda harus menyetujui Syarat & Ketentuan.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Kata sandi tidak cocok.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Kata sandi minimal 8 karakter.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      await refresh();
      router.push("/");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Gagal membuat akun.",
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
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-50 border-4 border-red-100 flex items-center justify-center overflow-hidden">
            <Image
              src="/Logo_klethisans.jpeg"
              alt="Klethisan Can's Logo"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
        </div>

        {/* Brand Name */}
        <p className="text-center text-xs font-bold text-red-900 tracking-widest uppercase mb-6">
          Klethisan Can&apos;s
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-8 mb-8">
          <Link
            href="/masuk"
            className="text-gray-500 font-medium pb-2 border-b-2 border-transparent hover:text-gray-700 transition-colors">
            Masuk
          </Link>
          <Link
            href="/daftar"
            className="text-red-900 font-semibold pb-2 border-b-2 border-red-900">
            Daftar
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Daftar ke Klethisan Can&apos;s
        </h1>
        <p className="text-gray-600 text-center text-sm mb-8">
          Buat akun untuk mulai berbelanja camilan favoritmu.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Lengkap
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={18} />
              </div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-100 border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-red-900 focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          {/* Email or WhatsApp */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email atau WhatsApp
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <AtSign size={18} />
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kata Sandi
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimal 8 karakter"
                className="w-full pl-11 pr-12 py-3.5 bg-gray-100 border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-red-900 focus:bg-white transition-all"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Konfirmasi Kata Sandi
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <RefreshCw size={18} />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Ulangi kata sandi"
                className="w-full pl-11 pr-12 py-3.5 bg-gray-100 border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-red-900 focus:bg-white transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 text-red-900 border-gray-300 rounded focus:ring-red-900 cursor-pointer"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-600 cursor-pointer">
              Saya menyetujui{" "}
              <Link
                href="/syarat"
                className="text-red-900 font-medium hover:underline">
                Syarat & Ketentuan
              </Link>{" "}
              serta{" "}
              <Link
                href="/privasi"
                className="text-red-900 font-medium hover:underline">
                Kebijakan Privasi
              </Link>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-900 hover:bg-red-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-900/20 mt-2">
            {isSubmitting ? "Memproses..." : "Daftar Sekarang"}
            <ArrowRight size={18} />
          </button>
        </form>
      </div>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Sudah punya akun?{" "}
        <Link
          href="/masuk"
          className="text-red-900 font-semibold hover:underline">
          Masuk sekarang
        </Link>
      </p>
    </div>
  );
}
