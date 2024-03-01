"use client";
import { Photo } from "pexels";
import MovieGrid from "@/components/MovieGrid";
import MovieCarousel from "@/components/MovieCarousel";
import Scaffold from "@/components/Scaffold";
import authenticate_user from "@/utils/AuthenticateUser";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import fetch_photos from "@/utils/FetchPhotos";

export default function Home(): React.JSX.Element {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [gridPhotos, setGridPhotos] = useState<Photo[]>([]);
  const [carouselPhotos, setCarouselPhotos] = useState<Photo[]>([]);
  const [searchInitiated, setSearchInitiated] = useState<boolean>(false);
  const [data, setData] = useState<Photo[]>([]);
  const router = useRouter();
  const state_prototype = {
    "btn-home": true,
    "btn-film": false,
    "btn-television": false,
    "btn-bookmark": false,
  };
  useEffect(() => {
    if (authenticate_user(router)) {
      setAuthenticated(true);
      (async () => {
        const getGridPhotos = await fetch_photos();
        const getCarouselPhotos = await fetch_photos("Ocean", 5);
        setGridPhotos(getGridPhotos);
        setCarouselPhotos(getCarouselPhotos);
      })();
    }
  }, []);

  async function handle_search(e: any) {
    try {
      const regex = /^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:'"[\]{}|\\/~` ]+$/;
      const inputValue = e.target.value;
      if (regex.test(inputValue)) {
        if (!searchInitiated) {
          setSearchInitiated(true);
        }
        const valueReturned = await fetch_photos(inputValue);
        setData(valueReturned);
      } else if (searchInitiated) {
        setSearchInitiated(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return !authenticated ? (
    <></>
  ) : (
    <Scaffold activeIcon={state_prototype} activateSearch={handle_search}>
      <div className="mb-24">
        {searchInitiated ? (
          data.length === 0 ? (
            <p>No movie found</p>
          ) : (
            <MovieGrid photos={data} />
          )
        ) : (
          <>
            <MovieCarousel heading={"Trending"} photos={carouselPhotos} />
            <MovieGrid heading={"Recommended For You"} photos={gridPhotos} />
          </>
        )}
      </div>
    </Scaffold>
  );
}
