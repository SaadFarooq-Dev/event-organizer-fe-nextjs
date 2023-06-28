"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(Component: any) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const userLocal: any = localStorage.getItem("userInfo");
    const user = JSON.parse(userLocal);
    const userIsAuthenticated = user !== null;
    // console.log(userLocal, user);
    // const userIsAuthenticated = true;

    useEffect(() => {
      if (!userIsAuthenticated) {
        router.push("/signin");
      }
    }, [userIsAuthenticated, router]);

    return userIsAuthenticated ? <Component {...props} /> : null;
  };
}
