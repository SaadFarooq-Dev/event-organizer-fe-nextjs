"use client";

import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/redux/features/users/userApiSlice";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const userInfo = useSelector((state: RootState) => state.authReducer);

  const [editMode, setEditMode] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const userId = userInfo?.value?.id;
  const token = userInfo?.value?.token;

  const {
    data: user,
    isLoading,
    refetch,
  } = useGetUserQuery(
    { userId, token },

    {
      pollingInterval: 60000,
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  const [updateUser] = useUpdateUserMutation();

  if (!user) {
    return <div>Loading...</div>;
  }

  const { id, name, email, phoneNumber } = user.user;

  const handleEdit = () => {
    setEditMode(true);
    setUserData({
      name,
      email,
      phoneNumber,
    });
  };

  const handleSave = async () => {
    const data = {
      ...userData,
      id,
    };

    const res = await updateUser({ userInfo: data, token });

    refetch();

    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <>
      <main className="flex-grow">
        <section className="">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20 flex flex-col items-center">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                  Profile
                </h1>

                {editMode ? (
                  <>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Edit
                  </button>
                )}
              </div>
              {editMode ? (
                <>
                  <form>
                    <div className="mb-6">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        defaultValue={userData.name}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        defaultValue={userData.email}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="phoneNumber"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="phoneNumber"
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            phoneNumber: e.target.value,
                          }))
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        defaultValue={userData.phoneNumber}
                        required
                      />
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="text-lg mb-4">
                    <span className="font-bold">Name:</span> {name}
                  </div>
                  <div className="text-lg mb-4">
                    <span className="font-bold">Email:</span> {email}
                  </div>
                  <div className="text-lg mb-4">
                    <span className="font-bold">Phone Number:</span>{" "}
                    {phoneNumber}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
