"use client";
import MovieDetails from "@/components/MovieDetails";
import { Video } from "pexels";
import Scaffold from "@/components/Scaffold";
import authenticate_user from "@/utils/AuthenticateUser";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import fetch_videos from "@/utils/FetchVideos";
import { videoType } from "../../types";
import { useSearchParams } from "next/navigation";

export default function movieDetails(): React.JSX.Element {
  const [authenticated, setAuthenticated] = useState(false);
  const params = useSearchParams();
  const [video, setVideo] = useState<videoType>({
    id: 0,
    src: "",
    cast: "",
    name: "",
  });
  const router = useRouter();
  useEffect(() => {
    if (authenticate_user(router)) {
      setAuthenticated(true);
      const query = params.get("query") || undefined;
      (async () => {
        const getVideo = await fetch_videos(query);
        setVideo({ ...getVideo, name: query });
      })();
    }
  }, []);
  return !authenticated ? (
    <></>
  ) : (
    <Scaffold removeSearch={true}>
      <MovieDetails videos={video} />
    </Scaffold>
  );
}
