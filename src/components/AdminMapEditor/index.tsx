"use client";

import dynamic from "next/dynamic";

const AdminMapEditor = dynamic(() => import("./AdminMapEditor"), {
  ssr: false,
});

const AdminMapEditorClientWrapper = () => {
  return <AdminMapEditor />;
};

export default AdminMapEditorClientWrapper;
