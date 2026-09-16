"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfileSidebar from "@/components/ProfileSidebar";
import ProfileForm from "@/components/ProfileForm";

export default function ProfilPage() {
  const router = useRouter();

  useEffect(() => {
    if (window.localStorage.getItem("klethisan-authenticated") !== "true") {
      router.replace("/masuk");
    }
  }, [router]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <ProfileSidebar />
          </div>

          {/* Main Form */}
          <div className="lg:col-span-8">
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
}
