"use client";

import { LOCAL_STORAGE_TOKEN } from "@/common/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { handlePathes } from "./layout";

const LoginCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
    const { pathname } = router;
    const checkUri = handlePathes.includes(pathname);
    if (!token) {
      router.push("/login");
    }

    if (token && checkUri) {
      router.push("/");
    }
  });

  return null;
};

export default LoginCheck;
