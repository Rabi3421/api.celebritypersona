"use client";
import { AuthProvider } from "../../contexts/AuthContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Providers = ({ children }) => {
  const pathname = usePathname();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);
  
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default Providers;
