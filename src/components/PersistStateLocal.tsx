"use client";

import { checkAuthLocal } from "@/redux/features/auth/authSlice";
import { AppDispatch } from "@/redux/store";
import { AuthRoles } from "@/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function PersistStateLocal({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const [state, setState] = useState({
    value: {
      isAuth: false,
      email: "",
      id: "",
      role: AuthRoles.User,
      token: "",
    },
  });

  useEffect(() => {
    const storedState = localStorage.getItem("userInfo");
    if (storedState) {
      setState(JSON.parse(storedState));
      const { value } = state;
      dispatch(checkAuthLocal(value));
    }
  }, []);

  // useEffect(() => {
  // }, [state]);

  return children;
}
