"use client";

import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

import AuthForm from "@/components/AuthForm";

export default function SignIn() {
  const router = useRouter();

  const userInfo = useSelector((state: RootState) => state.authReducer);

  const loggedIn = userInfo?.value?.isAuth ? true : false;

  if (loggedIn) {
    router.push("/dashboard");
  } else if (loggedIn === false) {
    return (
      <section className="my-auto">
        <AuthForm formType="SignIn" />
      </section>
    );
  }
}
