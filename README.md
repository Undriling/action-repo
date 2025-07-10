# Webhook Events Dashboard

A **modern React web app** to display real-time GitHub webhook events collected by your backend server.  
This dashboard fetches events from your Flask API and presents them in a clean, responsive interface.

---

## 🚀 Features

✅ **Live Event Display**  
Shows push events, pull requests, and merges with clear formatting.

✅ **Auto Refresh**  
Fetches new events periodically to keep the UI up to date.

✅ **Raw JSON Debugging**  
View raw event payloads for easy troubleshooting.

✅ **Disambiguated Messages**  
Events are translated into human-readable descriptions.

✅ **Modern UI**  
- Tailwind CSS styling  
- Inter font for typography  
- Smooth fade-in animations

✅ **Responsive Layout**  
Optimized for desktop and mobile screens.

---

## 🛠️ Tech Stack

- React
- JavaScript (ES6)
- Vite (build tool)
- Tailwind CSS
- React Icons

---

## ⚙️ Installation

Clone this repo and install dependencies:

```bash
git clone https://github.com/yourusername/your-frontend-repo.git
cd your-frontend-repo
npm install
```

---

## Start the development server:

```bash
npm run dev
```

---

## Steps to follow before start the development server :-

 - Step 1 :- Change the API Fetch URL
    In your frontend code (EventsPage.jsx or useFetchEvents.js), update the fetch URL to point to your ngrok tunnel or deployed backend:
    ```bash
    const response = await fetch("https://<your-ngrok-url>/events", {
        headers: { "ngrok-skip-browser-warning": "true" }
    });
    ```

 - Step 2 :- 
    Also add the ngrok URL to you Github Webhooks
    Github > Repo > Settings > Webhooks
    Checked ok events PUSH and PULL
    ```bash
     https://<your-ngrok-url>/webhook
    ```
