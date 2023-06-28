"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InitialState,
  AuthRoles,
  AuthState,
  LogInPayloadAction,
} from "@/types";

const initialState = (() => {
  let storedState;

  if (typeof window !== "undefined" && window.localStorage) {
    storedState = localStorage.getItem("userInfo");
  }

  return storedState
    ? JSON.parse(storedState)
    : ({
        value: {
          isAuth: false,
          email: "",
          id: "",
          role: AuthRoles.User,
          token: "",
        } as AuthState,
      } as InitialState);
})();

// const initialState = (() => {

//   return {
//     value: {
//       isAuth: false,
//       email: "",
//       id: "",
//       role: AuthRoles.User,
//       token: "",
//     } as AuthState,
//   } as InitialState;
// })();

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      localStorage.removeItem("userInfo");

      const defaultState = {
        value: {
          isAuth: false,
          email: "",
          id: "",
          role: AuthRoles.User,
          token: "",
        },
      };

      return defaultState;
    },

    logIn: (state, action: PayloadAction<LogInPayloadAction>) => {
      const newState = {
        value: {
          isAuth: true,
          email: action.payload.email,
          id: action.payload.id,
          role: action.payload.role,
          token: action.payload.token,
        },
      };

      localStorage.setItem("userInfo", JSON.stringify(newState));

      return newState;
    },
    checkAuthLocal: (state, action) => {
      const newState = {
        value: {
          isAuth: action.payload.isAuth,
          email: action.payload.email,
          id: action.payload.id,
          role: action.payload.role,
          token: action.payload.token,
        },
      };

      return newState;
    },
  },
});

export const { logIn, logOut, checkAuthLocal } = auth.actions;
export default auth.reducer;
