export type CustomerProfile = {
  fullName: string;
  email: string;
  whatsapp: string;
  birthDate: string;
  gender: string;
  profileImage: string;
};

export const CUSTOMER_PROFILE_KEY = "klethisan-customer-profile";

export const defaultCustomerProfile: CustomerProfile = {
  fullName: "Pelanggan Klethisan",
  email: "",
  whatsapp: "",
  birthDate: "",
  gender: "male",
  profileImage: "/Logo_klethisans.jpeg",
};

export function getCustomerProfile(): CustomerProfile {
  if (typeof window === "undefined") return defaultCustomerProfile;

  const storedProfile = window.localStorage.getItem(CUSTOMER_PROFILE_KEY);
  if (!storedProfile) return defaultCustomerProfile;

  try {
    return {
      ...defaultCustomerProfile,
      ...JSON.parse(storedProfile),
    };
  } catch {
    return defaultCustomerProfile;
  }
}

export function saveCustomerProfile(profile: CustomerProfile) {
  window.localStorage.setItem(CUSTOMER_PROFILE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event("klethisan-auth-change"));
}