"use client";

import React, { JSX, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HiOutlineNewspaper,
  HiOutlineMenuAlt3,
  HiOutlineX,
  HiLocationMarker,
} from "react-icons/hi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaDrawPolygon } from "react-icons/fa";

interface NavItem {
  name: string;
  icon: JSX.Element;
  path: string;
}

const navItems: NavItem[] = [
  {
    name: "Manage News",
    icon: <HiOutlineNewspaper className="text-2xl" />,
    path: "/admin/dashboard/manage-news",
  },
  {
    name: "Manage Markers",
    icon: <HiLocationMarker className="text-2xl" />,
    path: "/admin/dashboard/manage-markers",
  },
  {
    name: "Manage polygon",
    icon: <FaDrawPolygon className="text-2xl" />,
    path: "/admin/dashboard/manage-polygon",
  },
];

const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <aside
      className={`h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <span className="text-xl font-bold">Admin</span>}
        <button
          onClick={toggleSidebar}
          className="text-white hover:text-gray-400"
        >
          {collapsed ? (
            <HiOutlineMenuAlt3 size={22} />
          ) : (
            <HiOutlineX size={22} />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navItems.map(({ name, icon, path }) => {
          const isActive = pathname === path;
          return (
            <Link
              key={name}
              href={path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {icon}
              {!collapsed && (
                <span className="text-sm font-medium">{name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <RiLogoutBoxRLine className="text-2xl" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
