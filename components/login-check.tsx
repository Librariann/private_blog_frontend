"use client";

import { LOCAL_STORAGE_TOKEN } from "@/common/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
    const currentPageUri = router.asPath;
    if (!token) {
      router.push("/login");
    }

    if (
      token &&
      (currentPageUri === "/login" || currentPageUri === "/create-account")
    ) {
      router.push("/");
    }
  });

  return null;
};

export default LoginCheck;
