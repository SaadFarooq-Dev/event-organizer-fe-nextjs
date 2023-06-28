"use client";

import { useGetAllUsersQuery } from "@/redux/features/users/userApiSlice";
import { RootState } from "@/redux/store";
import { UserType } from "@/types";
import { useSelector } from "react-redux";

export default function Users() {
  const userInfo = useSelector((state: RootState) => state.authReducer);

  const { data: users, isLoading } = useGetAllUsersQuery(
    userInfo?.value?.token,
    {
      pollingInterval: 60000,
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className="flex-grow">
        <section className="">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                  All Users
                </h1>
              </div>

              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Phone Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <>
                        <div>Loading...</div>
                      </>
                    ) : (
                      <>
                        {users.users.map((user: UserType) => {
                          return (
                            <tr
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                              key={user.id}
                            >
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {user.name}
                              </th>
                              <td className="px-6 py-4">{user.email}</td>
                              <td className="px-6 py-4">{user.phoneNumber}</td>
                              <td className="px-6 py-4">{user.role}</td>
                            </tr>
                          );
                        })}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
