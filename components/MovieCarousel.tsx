"use client";
import { Photo } from "pexels";
import { BiSolidFilm } from "react-icons/bi";
import { BsBookmarkFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

function MovieCarousel({
  heading,
  photos,
}: {
  heading: string;
  photos: Photo[];
}) {
  const router = useRouter();
  function handleClick(query: string | null) {
    router.push(`/movieDetails?query=${query}`);
  }

  return (
    <div className="h-60">
      {heading && <h2 className="ml-4">{heading}</h2>}
      <div className="flex scrollable-container overflow-x-scroll w-[90vw] mr-8">
        {photos &&
          photos.map((photo) => (
            <div
              key={String(photo.id)}
              onClick={() => handleClick(photo.alt)}
              className="ml-4 mr-2 text-slate-100 relative "
            >
              <div className="rounded-lg w-[400px] h-[200px] ">
                <img
                  src={photo.src.large}
                  className=" rounded-lg w-[100%]  h-full"
                />
              </div>
              <div className="absolute top-2 right-4 p-2 rounded-full bg-slate-500">
                <BsBookmarkFill className=" text-slate-100 w-[20px]" />
              </div>
              <div className="absolute bottom-0 left-4">
                <p className="flex items-center">
                  <BiSolidFilm className="w-[20px] text-gray-400" />
                  Movie
                </p>
                <h2>{photo.alt}</h2>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
export default MovieCarousel;
