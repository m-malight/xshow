"use client";
import { Photo } from "pexels";
import { BiSolidFilm } from "react-icons/bi";
import { BsBookmarkFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

function MovieGrid({
  heading,
  photos,
}: {
  heading?: string;
  photos: Photo[];
}): React.JSX.Element {
  const router = useRouter();
  function handleClick(query: string | null) {
    router.push(`/movieDetails?query=${query}`);
  }
  return (
    <div>
      {heading && <h2 className="ml-4">{heading}</h2>}
      <div className="flex flex-wrap scrollable-container h-[auto]">
        {photos &&
          photos.map((photo) => (
            <div
              key={String(photo.id)}
              onClick={() => handleClick(photo.alt)}
              className="mx-2 text-slate-100 w-40  lg:w-64 rounded-lg mb-2"
            >
              <div className="relative">
                <img
                  src={photo.src.large}
                  className="h-20 lg:h-56 rounded-lg w-[100%]"
                />
                <div className="absolute left-28 lg:left-48 top-2 p-2 rounded-full bg-slate-500">
                  <BsBookmarkFill className="text-slate-100 w-[20px]" />
                </div>
              </div>
              <div>
                <p className="flex  items-center">
                  <BiSolidFilm className="lg:w-[20px] text-gray-400" />
                  Movie
                </p>
              </div>
              <h2 className="mb-2 text-ellipsis overflow-hidden whitespace-nowrap">
                {photo.alt}
              </h2>
            </div>
          ))}
      </div>
    </div>
  );
}
export default MovieGrid;
