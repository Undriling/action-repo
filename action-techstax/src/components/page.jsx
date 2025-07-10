import { useEffect, useState } from "react";
import { FaUpload, FaCodeBranch, FaCode } from "react-icons/fa";
import { VscGitMerge } from "react-icons/vsc";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await fetch("https://aeb5aab72f08.ngrok-free.app/events", {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      const data = await res.json();
      setEvents(data);
      setIsConnected(true);
      setLastUpdate(new Date());
    } catch (err) {
      console.error(err);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 15000);
    return () => clearInterval(interval);
  }, []);

  const getEventIcon = (action) => {
    switch (action) {
      case "push":
        return <FaUpload className="w-5 h-5 text-blue-500" />;
      case "pull_request":
        return <FaCodeBranch className="w-5 h-5 text-purple-500" />;
      case "merge":
        return <VscGitMerge className="w-5 h-5 text-green-500" />;
      default:
        return <FaCode className="w-5 h-5 text-gray-500" />;
    }
  };

  const getDescription = (e) => {
    const date = new Date(e.timestamp).toLocaleString();
    switch (e.action) {
      case "push":
        return `${e.author} pushed to ${e.to_branch} on ${date}`;
      case "pull_request":
        return `${e.author} opened a pull request from ${e.from_branch} to ${e.to_branch} on ${date}`;
      case "merge":
        return `${e.author} merged ${e.from_branch} into ${e.to_branch} on ${date}`;
      default:
        return `Unknown event type: ${e.action} (${date})`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800">Webhook Report By Manash Baruah</h1>
        <p className="text-slate-500">Real-time monitoring of repository events</p>
        <div className="mt-2 flex items-center justify-center gap-2">
          {isConnected ? (
            <>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-green-600">Live</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-xs text-red-600">Offline</span>
            </>
          )}
          {lastUpdate && (
            <span className="text-xs text-gray-500 ml-2">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
        </div>
      </header>

      <div className="mb-6">
        <h2 className="font-semibold text-slate-700 mb-2">Raw JSON Debug</h2>
        <pre className="text-sm bg-slate-50 border p-3 font-mono text-slate-700 overflow-x-auto">
          {JSON.stringify(events, null, 2)}
        </pre>
      </div>

      <div className="space-y-4">
        {events.length === 0 ? (
          <div className="text-center text-slate-500 py-8 px-4">No events found</div>
        ) : (
          events
            .slice()
            .reverse()
            .map((e, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white border p-4 rounded-lg shadow-sm animate-fadeIn"
              >
                <div className="p-2 bg-slate-100 rounded-md">{getEventIcon(e.action)}</div>
                <div>
                  <div className="font-medium text-slate-800">{getDescription(e)}</div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default EventsPage;
