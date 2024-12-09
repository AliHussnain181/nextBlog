import { UserType } from "@/Types";
import Link from "next/link";
import React from "react";

const HeaderLi = ({ user }: { user: UserType | null }) => {
  return (
    <>
      <Link href="/">Home</Link>
      <Link href="/blogs">Blogs</Link>
      <Link href="#features">features Blogs</Link>
      {Boolean(user?._id) ? (
        <Link href="/profile">Profile</Link>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </>
  );
};

export default HeaderLi;
