"use client";

import {
  useGetUserEventQuery,
  useGetUserJoinedEventQuery,
  useUpdateEventMutation,
} from "@/redux/features/events/eventApiSlice";
import { RootState } from "@/redux/store";
import { EventType } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const [userData, setUserData] = useState({
    title: "",
    desc: "",
    location: "",
    eventId: "",
  });

  const userInfo = useSelector((state: RootState) => state.authReducer);

  const { data: events, isLoading } = useGetUserEventQuery(
    userInfo?.value?.token,
    {
      pollingInterval: 60000,
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );
  const { data: attendingEvents, isLoading: isLoadingAttending } =
    useGetUserJoinedEventQuery(userInfo?.value?.token, {
      pollingInterval: 60000,
      refetchOnMountOrArgChange: true,
      skip: false,
    });

  const [updateEvent] = useUpdateEventMutation();

  if (!events) {
    return <div>Loading...</div>;
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSave = (userData: any) => {
    const { eventId, ...eventData } = userData;
    updateEvent({
      eventInfo: eventData,
      token: userInfo?.value?.token,
      eventId,
    });
    closeModal();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit
                </Dialog.Title>

                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="text"
                  name="title"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={userData.title}
                  required
                />
                <label
                  htmlFor="desc"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="text"
                  name="desc"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      desc: e.target.value,
                    }))
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={userData.desc}
                  required
                />
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="text"
                  name="location"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={userData.location}
                  required
                />

                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => handleSave(userData)}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  >
                    Save
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 text-red-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <main className="flex-1">
        <section className="">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                  Dashboard
                </h1>
              </div>
              {userInfo?.value?.role === "organizer" && (
                <div className="relative overflow-x-auto">
                  <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    My Events
                  </h1>
                  <table className="mb-14 w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Desc
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Location
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Start Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          End Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Attendees
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
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
                          {userInfo?.value?.role === "organizer" &&
                            events?.event?.map((event: EventType) => {
                              return (
                                <tr
                                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                  key={event.id}
                                >
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                  >
                                    {event.title}
                                  </th>
                                  <td className="px-6 py-4">{event.desc}</td>
                                  <td className="px-6 py-4">
                                    {event.location}
                                  </td>
                                  <td className="px-6 py-4">
                                    {event.startDate}
                                  </td>
                                  <td className="px-6 py-4">{event.endDate}</td>
                                  <td className="px-6 py-4">
                                    {event.attendeeCount}
                                  </td>
                                  <td className="px-6 py-4">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setUserData({
                                          title: event.title,
                                          desc: event.desc,
                                          location: event.location,
                                          eventId: event.id,
                                        });

                                        openModal();
                                      }}
                                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    >
                                      Edit
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="relative overflow-x-auto">
                <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                  Attending Events
                </h1>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Desc
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Start Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        End Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoadingAttending ? (
                      <>
                        <div>Loading...</div>
                      </>
                    ) : (
                      <>
                        {attendingEvents?.event?.length > 0
                          ? attendingEvents?.event?.map(
                              (attendingEvent: {
                                id: String;
                                user_id: String;
                                event: EventType;
                              }) => {
                                return (
                                  <tr
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    key={attendingEvent.event.id}
                                  >
                                    <th
                                      scope="row"
                                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                      {attendingEvent.event.title}
                                    </th>
                                    <td className="px-6 py-4">
                                      {attendingEvent.event.desc}
                                    </td>
                                    <td className="px-6 py-4">
                                      {attendingEvent.event.location}
                                    </td>
                                    <td className="px-6 py-4">
                                      {attendingEvent.event.startDate}
                                    </td>
                                    <td className="px-6 py-4">
                                      {attendingEvent.event.endDate}
                                    </td>
                                  </tr>
                                );
                              }
                            )
                          : "Attend an event to see your attending events"}
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
