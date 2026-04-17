import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Morning GitHub practice (60–90 mins)", done: false },
    { id: 2, text: "Learn 1 new concept", done: false },
    { id: 3, text: "Push update to project", done: false },
    { id: 4, text: "Take a walk / reset", done: false },
    { id: 5, text: "Write reflection", done: false },
  ]);

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  return (
    <div>
      <h1>Productivity App</h1>

      {tasks.map((task) => (
        <div key={task.id} onClick={() => toggleTask(task.id)}>
          <input type="checkbox" checked={task.done} readOnly />
          {task.text}
        </div>
      ))}
    </div>
  );
}