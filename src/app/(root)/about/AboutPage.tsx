"use client";

import React, { useEffect, useState } from "react";
import styles from "./AboutPage.module.css";
import { Accordion, Loader } from "@mantine/core";

export default function AboutPage() {
  const [isServer, setIsServer] = useState(true);
  useEffect(() => {
    setIsServer(false);
  }, []);

  const items = (
    <>
      <Accordion.Item key={"0"} value={"0"}>
        <Accordion.Control className={styles.p1}>
          {"What is this website about?"}
        </Accordion.Control>
        <Accordion.Panel className={styles.p2}>
          {"This website created for a "}
          <a
            target="_blank"
            className={styles.link}
            href="https://startup-summer.paralect.com/"
          >
            {"Paralect Startup summer 2024"}
          </a>
          {" program. You can find source code on "}
          <a
            target="_blank"
            className={styles.link}
            href="https://github.com/BIGZi0348/paralect-test/"
          >
            {"Github"}
          </a>
          {" as well as other info about this website."}
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key={"1"} value={"1"}>
        <Accordion.Control className={styles.p1}>
          {"What can i do on this website?"}
        </Accordion.Control>
        <Accordion.Panel className={styles.p2}>
          {
            "You can search movies by different queries and see more info about them on their respective pages. Also there is an option to save favorite movies by rating them."
          }
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key={"2"} value={"2"}>
        <Accordion.Control className={styles.p1}>
          {"What is ArrowFlicks?"}
        </Accordion.Control>
        <Accordion.Panel className={styles.p2}>
          {"Just a random name given by "}
          <a
            target="_blank"
            className={styles.link}
            href="https://www.figma.com/design/VkLZt5T4dZQQ3cEhWcnhyG/Movie-Search-App?node-id=0-1&t=ZfMoOiVVX6NXoCe1-0"
          >
            {"Paralect design model"}
          </a>
          {" for us to replicate."}
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key={"3"} value={"3"}>
        <Accordion.Control className={styles.p1}>
          {"Who created it?"}
        </Accordion.Control>
        <Accordion.Panel className={styles.p2}>
          <a
            target="_blank"
            className={styles.link}
            href="https://alek348.com/"
          >
            {"Me"}
          </a>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item key={"4"} value={"4"}>
        <Accordion.Control className={styles.p1}>
          {"What's your favorite movie?"}
        </Accordion.Control>
        <Accordion.Panel className={styles.p2}>
          <a
            target="_blank"
            className={styles.link}
            href="https://tmdb.alek348.com/movies/5559"
          >
            {"This one"}
          </a>
        </Accordion.Panel>
      </Accordion.Item>
    </>
  );

  return (
    <>
      {isServer ? (
        <Loader color="#9854F6" className={styles.loader} />
      ) : (
        <div className={styles.frame}>
          <p className={styles.p}>{"About"}</p>
          <Accordion
            className={styles.accordion}
            classNames={{ control: styles.accordionControl }}
          >
            {items}
          </Accordion>
        </div>
      )}
    </>
  );
}
