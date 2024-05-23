"use client";

import YouTube from "react-youtube";

export default function YoutubeComponent({ className, youtubeVideoURL }: any) {
  return (
    <YouTube
      className={className}
      iframeClassName={className}
      videoId={youtubeVideoURL}
    />
  );
}
