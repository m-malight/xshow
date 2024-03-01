"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsBookmarkFill } from "react-icons/bs";
import { PiTelevisionFill } from "react-icons/pi";
import { FaClapperboard } from "react-icons/fa6";
import { BiSolidFilm } from "react-icons/bi";
import { AiOutlineAppstore } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { activeIconType } from "@/types";

function Nav({
  activeIcon,
}: {
  activeIcon?: activeIconType;
}): React.JSX.Element {
  const state_prototype = {
    "btn-home": false,
    "btn-film": false,
    "btn-television": false,
    "btn-bookmark": false,
  };

  const [btnState, setBtnState] = useState(activeIcon || state_prototype);
  const [img, setImg] = useState();
  const router = useRouter();
  function handleClick() {
    router.push("/updateImage");
  }
  function activeState(id: string) {
    setBtnState({ ...state_prototype, [id]: true });
  }
  useEffect(() => {
    const userPhoto = getUserPhoto();
    setImg(userPhoto);
  }, []);
  function getUserPhoto() {
    const url =
      "https://firebasestorage.googleapis.com/v0/b/entertainment-web-app-7cfba.appspot.com/o/about15.png?alt=media&token=1cbb9a8d-da06-4037-b2b4-ef6948739470&_gl=1*aboxdu*_ga*MzcyMzUxODM3LjE2OTQ2Nzk5OTE.*_ga_CW55HF8NVT*MTY5ODY3MzU4Mi4xNC4xLjE2OTg2NzM3MDYuNjAuMC4w";
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      return user.photoURL;
    } else {
      return url;
    }
  }

  return (
    <div className="h-16 w-[94vw] lg:w-18 lg:h-[94vh] lg:top-5 bg-slate-900 rounded-lg lg:mt-4 ml-4 flex flex-row lg:flex-col justify-between items-center">
      <div>
        <FaClapperboard
          style={{ width: "20px" }}
          className="mr-8 ml-2 lg:mt-4 lg:mb-4 lg:mr-0 lg:ml-0 w-12 text-red-700"
        />
      </div>
      <div className="flex flex-row lg:flex-col items-center">
        <Link href="/">
          <AiOutlineAppstore
            onClick={() => activeState("btn-home")}
            style={{ width: "24px" }}
            color={`${btnState["btn-home"] ? "red" : ""}`}
            className={`ml-4 lg:mt-4 lg:ml-0  w-12 text-slate-5`}
          />
        </Link>
        <div>
          <BiSolidFilm
            onClick={() => activeState("btn-film")}
            style={{ width: "20px" }}
            color={`${btnState["btn-film"] ? "red" : ""}`}
            className={`ml-4 lg:mt-4  lg:ml-0 w-12 text-gray-400`}
          />
        </div>
        <div>
          <PiTelevisionFill
            onClick={() => activeState("btn-television")}
            style={{ width: "20px" }}
            color={`${btnState["btn-television"] ? "red" : ""}`}
            className={`ml-4 lg:mt-4  lg:ml-0 w-12  text-gray-400`}
          />
        </div>
        <div>
          <Link href="/bookmark">
            <BsBookmarkFill
              onClick={() => activeState("btn-bookmark")}
              style={{ width: "20px" }}
              color={`${btnState["btn-bookmark"] ? "red" : ""}`}
              className={`ml-4 lg:mt-4  lg:ml-0 text-gray-400 `}
            />
          </Link>
        </div>
      </div>
      <div
        onClick={handleClick}
        className="w-8 h-8  ml-8 mr-2  rounded-full lg:ml-0 lg:mr-0 lg:mb-2 lg:mt-80 overflow-hidden"
        style={{ border: "2px solid white" }}
      >
        <img src={img} alt="Profile picture" />
      </div>
    </div>
  );
}
export default Nav;
