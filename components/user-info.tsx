"use client";

import { useMe } from "@/hooks/useMe";

const UserInfo = () => {
  const { data: { me: { id = "", email = "" } = {} } = {} } = useMe();
  console.log(id);
  return (
    <>
      <div>{id}</div>
      <div>{email}</div>
    </>
  );
};

export default UserInfo;
