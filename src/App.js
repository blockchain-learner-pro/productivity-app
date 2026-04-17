import { useState, useEffect } from "react";

const initialTasks = {
  Monday: [
    { id: 1, text: "FreeCodeCamp: Blockchain basics", done: false },
    { id: 2, text: "Write: 1 thing I learned", done: false },
  ],
  Tuesday: [
    { id: 1, text: "Skool: AI + blockchain concepts", done: false },
    { id: 2, text: "Mini practice task", done: false },
  ],
  Wednesday: [
    { id: 1, text: "FreeCodeCamp: Smart contracts / Cairo", done: false },
    { id: 2, text: "Coding exercise", done: false },
  ],
  Thursday: [
    { id: 1, text: "Skool: AI dApps / metadata ideas", done: false },
    { id: 2, text: "Build small feature idea", done: false },
  ],
  Friday: [
    { id: 1, text: "GitHub: Push updates to NFT project", done: false },
    { id: 2, text: "Commit + document progress", done: false },
  ],
  Weekend: [
    { id: 1, text: "Weekly reflection", done: false },
    { id: 2, text: "Plan next week", done: false },
    { id: 3, text: "Rest / recovery", done: false },
  ],
};

const STORAGE_KEY = "offline_productivity_app_v1";

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [loaded, setLoaded] = useState(false);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  // Save data automatically
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, loaded]);

  const toggleTask = (day, id) => {
    setTasks((prev) => {
      const updatedDay = prev[day].map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      );
      return { ...prev, [day]: updatedDay };
    });
  };

  const resetApp = () => {
    localStorage.removeItem(STORAGE_KEY);
    setTasks(initialTasks);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📅 Offline Productivity App</h1>

      <button onClick={resetApp} style={{ marginBottom: "20px" }}>
        Reset Week
      </button>

      <div style={{ display: "grid", gap: "20px" }}>
        {Object.entries(tasks).map(([day, dayTasks]) => (
          <div key={day} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <h2>{day}</h2>

            {dayTasks.map((task) => (
              <div key={task.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(day, task.id)}
                  />
                  <span style={{ marginLeft: "8px" }}>
                    {task.done ? "✔ " : ""}{task.text}
                  </span>
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>

      <p style={{ marginTop: "20px", fontSize: "12px" }}>
        Works offline • Saves automatically • No login required
      </p>
    </div>
  );
}
