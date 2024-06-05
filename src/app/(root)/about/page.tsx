"use server";

import type { Metadata } from "next";
import AboutPage from "./AboutPage";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About",
    description: "Most important question is why.",
  };
}

export default async function About() {
  return <AboutPage />;
}
