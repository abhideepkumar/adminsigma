import React, { useState, useEffect } from "react";
import { router } from "next/router";
import { getSession } from "next-auth/react";
const Add = () => {
  const session = getSession();
  console.log("Add session", session);
  const [eventData, setEventData] = useState({
    admin: session.user,
    title: "",
    desc: "",
    location: { type: "offline", link: "" },
    deadline: "",
    date: "",
    time: "",
    registered: [],
  });
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setEventData((prevEventData) => ({
        ...prevEventData,
        admin: session.user.email,
      }));
    };
    fetchSession();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submit triggered", eventData);
      const response = await fetch("/api/auth/addevent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
        },
        body: JSON.stringify(eventData),
      });
      if (response.ok) {
        console.log("Data sent successfully!");
        router.push("/");
      } else {
        console.error("response: ", response);
      }
    } catch (err) {
      console.error("Error saving data from catch block", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevEventData) => ({
      ...prevEventData,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 m-6">
        <label htmlFor="title" className="block text-gray-700 font-medium">
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={handleChange}
          className="mt-1 p-2 block w-1/2 border border-blue-300 rounded-md shadow-sm  sm:text-sm"
        />
        <label htmlFor="desc" className="block text-gray-700 font-medium">
          Description:
        </label>
        <textarea
          name="desc"
          value={eventData.desc}
          onChange={handleChange}
          className="mt-1 p-2 block w-1/2 border  border-blue-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
        <div className="flex space-x-4">
          <label
            htmlFor="locationType"
            className="block text-gray-700 font-medium"
          >
            Location Type:
          </label>
          <select
            name="locationType"
            value={eventData.location.type}
            onChange={(e) =>
              handleChange({
                ...e,
                target: {
                  ...e.target,
                  name: "location",
                  value: {
                    ...eventData.location,
                    type: e.target.value,
                  },
                },
              })
            }
            className="mt-1 p-2 block  border border-blue-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="offline">Offline</option>
            <option value="online">Online</option>
          </select>
          <label
            htmlFor="locationType"
            className="block text-gray-700 font-medium"
          >
            Location Link:
          </label>
          <input
            type="text"
            name="locationLink"
            value={eventData.location.link}
            onChange={(e) =>
              handleChange({
                ...e,
                target: {
                  ...e.target,
                  name: "location",
                  value: {
                    ...eventData.location,
                    link: e.target.value,
                  },
                },
              })
            }
            className="mt-1 p-2 block w-1/2 border border-blue-300 rounded-md shadow-sm  sm:text-sm"
          />
        </div>
        <label htmlFor="deadline" className="block text-gray-700 font-medium">
          Deadline:
        </label>
        <input
          type="date"
          name="deadline"
          value={eventData.deadline}
          onChange={handleChange}
          className="mt-1 p-2 block  border border-blue-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <label htmlFor="date" className="block text-gray-700 font-medium">
          Event Date:
        </label>
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          className="mt-1 p-2 block  border border-blue-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <label htmlFor="time" className="block text-gray-700 font-medium">
          Event Time:
        </label>
        <input
          type="time"
          name="time"
          value={eventData.time}
          onChange={handleChange}
          className="mt-1 p-2 block  border border-blue-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add;
