"use client";
import MovieGrid from "@/components/MovieGrid";
import { Photo } from "pexels";
import Scaffold from "@/components/Scaffold";
import fetch_photos from "@/utils/FetchPhotos";

import authenticate_user from "@/utils/AuthenticateUser";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home(): React.JSX.Element {
  const [authenticated, setAuthenticated] = useState(false);
  const [tvSeriesPhotos, setTvSeriesPhotos] = useState<Photo[]>([]);
  const [moviesPhotos, setMoviesPhotos] = useState<Photo[]>([]);

  const state_prototype = {
    "btn-home": false,
    "btn-film": false,
    "btn-television": false,
    "btn-bookmark": true,
  };
  const router = useRouter();
  useEffect(() => {
    if (authenticate_user(router)) {
      setAuthenticated(true);
      (async () => {
        const getMoviesPhotos = await fetch_photos("Animal");
        const getTvSeriesPhotos = await fetch_photos("People", 5);
        setMoviesPhotos(getMoviesPhotos);
        setTvSeriesPhotos(getTvSeriesPhotos);
      })();
    }
  }, []);
  return !authenticated ? (
    <></>
  ) : (
    <Scaffold activeIcon={state_prototype}>
      <div className="mb-24">
        <MovieGrid heading={"BookMarked Movies"} photos={moviesPhotos} />
        <MovieGrid heading={"BookMarked Tv Series"} photos={tvSeriesPhotos} />
      </div>
    </Scaffold>
  );
}
