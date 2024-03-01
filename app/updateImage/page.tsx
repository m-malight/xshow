"use client";
import ImageUpload from "@/components/ImageUpload";
import authenticate_user from "@/utils/AuthenticateUser";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Image() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (authenticate_user(router)) {
      setAuthenticated(true);
    }
  }, []);
  return !authenticated ? <></> : <ImageUpload />;
}
