"use client";
import React from "react";
import { videoType } from "@/types";

function MovieDetails({ videos }: { videos: videoType }) {
  return (
    <div className=" h-[96vh]  overflow-hiddden">
      <div className="w-full h-[57.6vh] flex justify-center">
        <div id={String(videos.id)}>
          <video src={videos.src} className="w-[100%] h-[100%]" controls />
          <div className="flex justify-between py-2  h-[38.4vh] ">
            <div className=" w-[100%]">
              <h1 className="font-extrabold text-2xl mx-6 mb-5 ">
                {videos.name}
              </h1>
              <div className="whitespace-normal h-[70%]  mx-6  overflow-y-scroll  scrollable-container">
                <p className="text-justify">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Eligendi delectus quasi a praesentium reprehenderit doloribus
                  solut. mollitia maxime veritatis volupt, esse veniam totam.
                  consequuntur ad magnam, earum libero maiores voluptatemk.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Eligendi delectus quasi a praesentium reprehenderit doloribus
                  soluta mollitia maxime veritatis voluptate, esse veniam totam
                  consequuntur ad magnam, earum libero maiores voluptatemk.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Eligendi delectus quasi a praesentium reprehenderit doloribus
                  soluta mollitia maxime veritatis voluptate, esse veniam totam
                  consequuntur ad magnam, earum libero maiores voluptatemk.
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Eligendi delectus quasi a praesentium reprehenderit doloribus
                  soluta mollitia maxime veritatis voluptate, esse veniam totam
                  consequuntur ad magnam, earum libero maiores voluptatemk
                </p>
              </div>
            </div>
            <div className=" p-4  overflow-y-scroll scrollable-container">
              <p className="m-2 text-slate-500">
                Year: <span className="text-white">2019</span>
              </p>
              <p className="m-2 text-slate-500">
                Genre: <span className="text-white">Movie</span>
              </p>
              <p className="m-2 text-slate-500">
                Videographer:
                <span className="text-white">{videos.cast}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
