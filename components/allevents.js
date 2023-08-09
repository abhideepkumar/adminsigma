import { useEffect, useState } from "react";

const AllEvents = () => {
  const [EventAll, setEventAll] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/fetchevents")
      .then((response) => response.json())
      .then((data) => {
        const reversed_data = data.documents.reverse();
        setEventAll(reversed_data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetching user data:", error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {loading ? (
        <h1 className="text-2xl font-semibold text-gray-600">
          Loading... Please Wait
        </h1>
      ) : (
        <div className="w-full p-4">
          <h1 className="text-3xl font-semibold mb-4">All Events:</h1>
          <ul className="grid gap-4">
            {EventAll.map((event) => (
              <li key={event._id} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <p className="text-gray-600 mb-2">{event.desc}</p>
                <div className="flex flex-wrap">
                  <p className="mr-2">Location Type:</p>
                  <p className="mb-2">
                    {event.location?.type || "Not available"}
                  </p>
                </div>
                {event.location?.link && (
                  <div className="flex flex-wrap">
                    <p className="mr-2">Location Link:</p>
                    <a
                      href={event.location.link}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {event.location.link}
                    </a>
                  </div>
                )}
                <div className="flex flex-wrap">
                  <p className="mr-2">Deadline:</p>
                  <p>{event.deadline || "Not available"}</p>
                </div>
                <div className="flex flex-wrap">
                  <p className="mr-2">Event Date:</p>
                  <p>{event.date || "Not available"}</p>
                </div>
                <div className="flex flex-wrap">
                  <p className="mr-2">Event Time:</p>
                  <p>{event.time || "Not available"}</p>
                </div>
                <div className="flex flex-wrap">
                  <p className="mr-2">No of Students registered</p>
                  <p>{event.registered.length}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AllEvents;
