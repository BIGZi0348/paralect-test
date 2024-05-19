"use client";

import YouTube, { YouTubeProps } from "react-youtube";

const opts: YouTubeProps["opts"] = {
  width: "490",
  height: "271",
};

export default function YoutubeComponent({ youtubeVideoURL }: any) {
  return (
    <YouTube videoId={youtubeVideoURL} opts={opts} style={{ zIndex: "9" }} />
  );
}
