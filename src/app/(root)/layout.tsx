"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import { useEffect, useState } from "react";

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
