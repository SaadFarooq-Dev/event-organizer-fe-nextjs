"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [mobNavOpen, setMobNavOpen] = useState(true);

  const handleClick = () => {
    setMobNavOpen((prev) => !prev);
  };

  return (
    <>
      <div
        className="sidebar w-2/3  z-50 lg:w-2/12 lg:flex flex-col
    bg-white border-gray-200
    items-center py-6 gap-5 h-full dark:bg-gray-800 -translate-x-full lg:translate-x-0 transition duration-200 ease-in-out"
      >
        <Link
          onClick={handleClick}
          className="list-none p-4 w-11/12 text-center text-xl border-none rounded-lg hover:bg-gray-700 hover:cursor-pointer"
          href="/dashboard"
        >
          Dashboard
        </Link>

        <Link
          onClick={handleClick}
          href="/dashboard/events"
          className="list-none p-4 w-11/12 text-center text-xl border-none rounded-lg hover:bg-gray-700 hover:cursor-pointer"
        >
          Events
        </Link>
        <Link
          onClick={handleClick}
          href="/dashboard/users"
          className="list-none p-4 w-11/12 text-center text-xl border-none rounded-lg hover:bg-gray-700 hover:cursor-pointer"
        >
          Users
        </Link>
        <Link
          onClick={handleClick}
          href="/dashboard/profile"
          className="list-none p-4 w-11/12 text-center text-xl border-none rounded-lg hover:bg-gray-700 hover:cursor-pointer"
        >
          Profile
        </Link>
      </div>
    </>
  );
}
