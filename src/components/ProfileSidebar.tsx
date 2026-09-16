"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  defaultCustomerProfile,
  getCustomerProfile,
  saveCustomerProfile,
  CustomerProfile,
} from "@/data/customer";

export default function ProfileSidebar() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<CustomerProfile>(
    defaultCustomerProfile,
  );

  useEffect(() => {
    setProfile(getCustomerProfile());
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedProfile = {
          ...profile,
          profileImage: reader.result as string,
        };
        setProfile(updatedProfile);
        saveCustomerProfile(updatedProfile);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Profile Image */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-50">
            <Image
              src={profile.profileImage}
              alt="Profile"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <label className="absolute bottom-0 right-0 w-8 h-8 bg-red-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-800 transition-colors shadow-md">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-1">
          {profile.fullName}
        </h2>
        <p className="text-gray-600 text-sm mb-3">
          {profile.email || profile.whatsapp || "Lengkapi profil pelanggan"}
        </p>

        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-900 rounded-full text-xs font-medium border border-red-100">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Member Setia Klethisan
        </span>
      </div>

      {/* Change Photo Button */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium mb-3">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        Ubah Foto Profil
      </button>

      {/* Divider */}
      <div className="border-t border-gray-100 my-4"></div>

      {/* Logout Button */}
      <button
        type="button"
        onClick={() => {
          window.localStorage.removeItem("klethisan-authenticated");
          window.dispatchEvent(new Event("klethisan-auth-change"));
          router.push("/");
        }}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-900 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium border border-red-100">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Keluar dari Akun
      </button>
    </div>
  );
}
