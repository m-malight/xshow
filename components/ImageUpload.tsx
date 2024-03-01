"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import app, { db } from "@/utils/Firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { userDetail } from "@/types";

const storage = getStorage(app);
function ImageUpload(): React.JSX.Element {
  const [userDetails, setuserDetails] = useState<userDetail>({
    id: "",
    photoURL: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [buttonName, setButtonName] = useState<string>();
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const type = params.get("type") || "0";
    const getDetails = getUserDetails();
    setuserDetails(getDetails);
    if (parseInt(type) === 1) {
      setButtonName("Skip");
    } else {
      setButtonName("Cancel");
    }
  }, []);
  async function uploadImage(file: File | null) {
    const fileRef = ref(storage, `sign-in/${file!.name}`);
    const UploadedPhotoURL = await getDownloadURL(fileRef); //returns the url to me in my firebase
    await addDoc(collection(db, "users"), {
      photoURL: UploadedPhotoURL,
      id: userDetails.id,
    });
    const user = JSON.stringify({
      id: userDetails.id,
      photoURL: UploadedPhotoURL,
    });
    localStorage.setItem("user", user);
  }
  function getUserDetails() {
    const storedUser = localStorage.getItem("user");
    const user = JSON.parse(storedUser!);
    return user;
  }
  function handleClick(redirect: boolean) {
    if (redirect) {
      router.push("./");
    } else {
      uploadImage(photo);
    }
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setPhoto(e.target.files[0]);
      setuserDetails({
        ...userDetails,
        photoURL: URL.createObjectURL(e.target.files[0]),
      });
    }
  }
  return (
    <div className="flex flex-col items-center">
      <div>
        <h1 className="mt-4 text-xl">Upload your image</h1>
      </div>
      <img
        src={userDetails?.photoURL}
        alt=""
        className="rounded-full w-32 h-32 mt-6"
        style={{ border: "2px solid white" }}
      />
      <div className="flex justify-between mt-10">
        <label
          htmlFor="image"
          className="w-32 text-lg text-center"
          style={{ border: "2px solid red" }}
        >
          Choose Image
        </label>
        <input
          type="file"
          className="hidden"
          onChange={handleChange}
          id="image"
        />
        <button
          className="w-32 ml-5 text-lg"
          style={{ border: "2px solid green" }}
          onClick={
            photo === null
              ? () => {
                  handleClick(true);
                }
              : () => {
                  handleClick(false);
                }
          }
        >
          {photo === null ? buttonName : "Upload"}
        </button>
      </div>
    </div>
  );
}
export default ImageUpload;
