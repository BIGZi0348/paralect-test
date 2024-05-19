"use client";

import AFLogo from "../AFLogo/AFLogo";
import styles from "./Sidebar.module.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const initPage = () => {
    let result = 0;
    switch (pathname) {
      case "/movies":
        result = 0;
        break;
      case "/rated":
        result = 1;
        break;
      default:
        break;
    }
    return result;
  };

  const [activeLink, setActiveLink] = useState(initPage());
  const linksData = [
    { id: 0, label: "Movies", href: "/movies" },
    { id: 1, label: "Rated movies", href: "/rated" },
  ];

  const links = linksData.map((link) => (
    <Link
      scroll={false}
      className={styles.link}
      data-active={activeLink === link.id || undefined}
      href={link.href}
      onClick={() => {
        setActiveLink(link.id);
      }}
      key={link.id}
    >
      {link.label}
    </Link>
  ));

  useEffect(() => {
    setActiveLink(initPage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <nav className={styles.nav}>
      <AFLogo />
      <div className={styles.box}>{links}</div>
    </nav>
  );
}
