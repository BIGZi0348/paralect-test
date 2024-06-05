"use client";

import AFLogo from "../AFLogo/AFLogo";
import styles from "./Sidebar.module.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@mantine/hooks";
import { Burger, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function Sidebar() {
  const [opened, { close, toggle }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 740px)");
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
      case "/about":
        result = 2;
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
    { id: 2, label: "About", href: "/about" },
  ];

  const links = linksData.map((link) => (
    <Link
      scroll={false}
      className={styles.link}
      data-active={activeLink === link.id || undefined}
      href={link.href}
      onClick={() => {
        setActiveLink(link.id);
        close();
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
    <>
      <div id="scrollerToTop" />
      {isMobile ? (
        <>
          <nav className={styles.navMobile}>
            <AFLogo />
            <Burger
              opened={opened}
              onClick={toggle}
              aria-label="Toggle navigation"
            />
          </nav>
          <Modal
            classNames={{
              content: styles.modalContent,
              body: styles.modalBody,
            }}
            withCloseButton={false}
            opened={opened}
            onClose={close}
            fullScreen
            radius={0}
            transitionProps={{ transition: "scale-y", duration: 250 }}
            overlayProps={{
              backgroundOpacity: 0,
            }}
          >
            {links}
          </Modal>
        </>
      ) : (
        <nav className={styles.nav}>
          <AFLogo />
          <div className={styles.box}>{links}</div>
        </nav>
      )}
    </>
  );
}
