"use client";

import Link from "next/link";

import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { logOut } from "@/redux/features/auth/authSlice";

export default function Header() {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const logoutUser = () => {
    dispatch(logOut());
    router.push("/signin");
  };

  const userInfo = useSelector((state: RootState) => state.authReducer);

  const loggedIn = userInfo?.value?.isAuth ? true : false;

  const handleMobileMenu = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar?.classList.toggle("-translate-x-full");
  };

  return (
    <>
      <header className="sticky">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800  border-b dark:border-gray-700">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            {loggedIn && (
              <div
                className="lg:hidden bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 hover:dark:bg-gray-700 cursor-pointer rounded-lg px-3 py-2"
                onClick={handleMobileMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>
            )}
            <Link href="/" className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Logo
              </span>
            </Link>
            {loggedIn ? (
              <>
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={logoutUser}
                >
                  Log Out
                </button>
              </>
            ) : (
              <div className="flex items-center">
                <Link
                  href="/signin"
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
