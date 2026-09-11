"use client";

import { useState } from "react";

export default function NotificationPreferences() {
  const [preferences, setPreferences] = useState({
    batchOpening: true,
    specialVoucher: true,
  });

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
      <div className="flex items-start gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
          <svg
            className="w-5 h-5 text-red-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            Preferensi Notifikasi Pre-Order
          </h3>
          <p className="text-sm text-gray-600">
            Atur saluran pemberitahuan agar tidak ketinggalan slot kuota.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Batch Opening Notification */}
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div className="flex-1 pr-4">
            <h4 className="font-semibold text-gray-900 mb-1">
              Pengingat Pembukaan Batch PO Baru
            </h4>
            <p className="text-sm text-gray-600">
              Terima notifikasi WhatsApp otomatis saat varian camilan musiman
              favorit dibuka untuk kuota batch.
            </p>
          </div>
          <button
            type="button"
            onClick={() => togglePreference("batchOpening")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
              preferences.batchOpening ? "bg-red-900" : "bg-gray-300"
            }`}>
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences.batchOpening ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Special Voucher Notification */}
        <div className="flex items-center justify-between py-4">
          <div className="flex-1 pr-4">
            <h4 className="font-semibold text-gray-900 mb-1">
              Voucher Khusus & Penawaran Bundling Hari Raya
            </h4>
            <p className="text-sm text-gray-600">
              Dapatkan prioritas slot hampers dan diskon eksklusif member
              reguler via email & WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={() => togglePreference("specialVoucher")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
              preferences.specialVoucher ? "bg-red-900" : "bg-gray-300"
            }`}>
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences.specialVoucher ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
