"use client";

import {
  useAttendEventMutation,
  useGetAllEventsQuery,
} from "@/redux/features/events/eventApiSlice";
import { RootState } from "@/redux/store";
import { EventType } from "@/types";
import { useSelector } from "react-redux";

export default function Events() {
  const userInfo = useSelector((state: RootState) => state.authReducer);

  const { data: events, isLoading } = useGetAllEventsQuery(
    userInfo?.value?.token,
    {
      pollingInterval: 60000,
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  const [attendEvent] = useAttendEventMutation();

  if (!events) {
    return <div>Loading...</div>;
  }

  const handleAttendee = async (id: string) => {
    const token = userInfo?.value?.token;

    const res: any = await attendEvent({ eventId: id, token });
    if (res?.data?.success) {
      alert("Event joined successfully!");
    } else {
      alert("Event already joined!");
    }
  };

  return (
    <>
      <main className="flex-grow">
        <section className="">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                  All Events
                </h1>
              </div>

              <div className="relative overflow-x-auto">
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
                        {events.events.map((event: EventType) => {
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
                              <td className="px-6 py-4">{event.location}</td>
                              <td className="px-6 py-4">{event.startDate}</td>
                              <td className="px-6 py-4">{event.endDate}</td>
                              <td className="px-6 py-4">
                                <button
                                  type="button"
                                  onClick={(e) => handleAttendee(event.id)}
                                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                  Attend Event
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
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
