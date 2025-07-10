import { useEffect, useState } from "react";

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch("https://aeb5aab72f08.ngrok-free.app/events", {
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      });
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Webhook Events</h1>

      {/* Debug output */}
      <pre className="bg-gray-100 p-2 mb-4 border">{JSON.stringify(events, null, 2)}</pre>

      {events.length === 0 ? (
        <p className="text-gray-500">No events found yet.</p>
      ) : (
        events.map((event, index) => {
          const date = new Date(event.timestamp).toUTCString();
          let message = "";

          if (event.action === "push") {
            message = `"${event.author}" pushed to "${event.to_branch}" on ${date}`;
          } else if (event.action === "pull_request") {
            message = `"${event.author}" submitted a pull request from "${event.from_branch}" to "${event.to_branch}" on ${date}`;
          } else if (event.action === "merge") {
            message = `"${event.author}" merged branch "${event.from_branch}" to "${event.to_branch}" on ${date}`;
          } else {
            message = `Unknown event type`;
          }

          return (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded shadow p-4 mb-3"
            >
              {message}
            </div>
          );
        })
      )}
    </div>
  );
};

export default EventsPage;
