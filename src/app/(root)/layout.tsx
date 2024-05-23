"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import { useEffect, useState } from "react";

// layout for page in (root)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isServer, setIsServer] = useState(true);
  useEffect(() => {
    setIsServer(false);
  }, []);

  return (
    <>
      {isServer ? <></> : <Sidebar />}
      {children}
    </>
  );
}
