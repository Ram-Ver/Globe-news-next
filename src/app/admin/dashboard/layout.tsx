"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 bg-gray-100">{children}</main>
    </div>
  );
};

export default DashboardLayout;
