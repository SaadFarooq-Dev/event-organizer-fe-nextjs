"use client";

import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

import { logIn } from "@/redux/features/auth/authSlice";
import {
  AuthFormType,
  UserSchemaType,
  RegisterResponseType,
  LoginResponseType,
} from "@/types";
import { FormFields, Logo, UserRoles } from "@/assets/Constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/schema/UserSchema";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/redux/features/auth/authApiSlice";
import { useRouter } from "next/navigation";
import parseJwt from "@/utils/parseJWT";

export default function AuthForm({ formType }: AuthFormType) {
  const dispatch = useDispatch<AppDispatch>();

  const [loginUser] = useLoginUserMutation();

  const [registerUser] = useRegisterUserMutation();

  const userInfo = useSelector((state: RootState) => state.authReducer);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
  });

  const { title, email, password, buttonMsg, altMsg, altLink } =
    FormFields[formType];

  const { name, phoneNumber, role } = FormFields.SignUp;

  const onRegisterSubmit = async (userData: UserSchemaType) => {
    const res = await registerUser(userData);

    if ("data" in res) {
      const { success, user } = res.data as RegisterResponseType;
      if (success) {
        console.log(user);
        router.push("/signin");
      } else {
        console.log("failed to register");
      }
    } else {
      console.log(res.error);
    }
  };

  const onLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    const res = await loginUser({ email, password });

    if ("data" in res) {
      const { success, access_token } = res.data as LoginResponseType;
      if (success) {
        router.push("/dashboard");

        const decodedJWT = await parseJwt(access_token);

        const { email, id, role } = decodedJWT;

        dispatch(logIn({ email, id, role, token: access_token }));
      } else {
        console.log("failed to signin");
      }
    } else {
      console.log(res.error);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mb-6 mt-4">
      <Link
        href="/"
        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        {Logo}
      </Link>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {title}
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={
              formType === "SignIn"
                ? onLoginSubmit
                : handleSubmit(onRegisterSubmit)
            }
          >
            {formType === "SignUp" ? (
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {name}
                </label>
                <input
                  type="text"
                  {...register("name")}
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                  placeholder="name"
                  required
                />
                {errors.name ? (
                  <span className="text-red-600 text-sm">
                    {errors.name.message}
                  </span>
                ) : null}
              </div>
            ) : null}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {email}
              </label>
              <input
                type="email"
                {...register("email")}
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                placeholder="name@company.com"
                required
              />
              {errors.email ? (
                <span className="text-red-600 text-sm">
                  {errors.email.message}
                </span>
              ) : null}
            </div>
            {formType === "SignUp" ? (
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {phoneNumber}
                </label>
                <input
                  type="text"
                  {...register("phoneNumber")}
                  name="phoneNumber"
                  id="phoneNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                  placeholder="+123456789011"
                  required
                />
                {errors.phoneNumber ? (
                  <span className="text-red-600 text-sm">
                    {errors.phoneNumber.message}
                  </span>
                ) : null}
              </div>
            ) : null}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {password}
              </label>
              <input
                type="password"
                {...register("password")}
                name="password"
                id="password"
                placeholder="••••••••••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                required
              />
              {errors.password ? (
                <span className="text-red-600 text-sm">
                  {errors.password.message}
                </span>
              ) : null}
            </div>

            {formType === "SignUp" ? (
              <div>
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {role}
                </label>
                <select
                  {...register("role")}
                  name="role"
                  id="role"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                  required
                  defaultValue={UserRoles.User}
                >
                  {Object.keys(UserRoles).map((key) => (
                    <option key={UserRoles[key]} value={UserRoles[key]}>
                      {key}
                    </option>
                  ))}
                </select>
                {errors.role ? (
                  <span className="text-red-600 text-sm">
                    {errors.role.message}
                  </span>
                ) : null}
              </div>
            ) : null}

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {buttonMsg}
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              {altMsg}{" "}
              <Link
                href={formType === "SignIn" ? "/signup" : "/signin"}
                className="font-medium 
                    text-blue-600 hover:underline dark:text-blue-500"
              >
                {altLink}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
