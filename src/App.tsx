import { useState } from "react";

// Define the structure of a Task
interface Task {
  id: number;
  name: string;
  status: "IN PROGRESS" | "DONE" | "COMPLETE";
  parentId?: number;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState<number | "">("");
  const [filter, setFilter] = useState("ALL");

  // Function to add a new task
  const addTask = () => {
    if (!name.trim()) return;
    const newTask: Task = {
      id: tasks.length + 1,
      name,
      status: "IN PROGRESS",
      parentId: parentId || undefined,
    };
    setTasks([...tasks, newTask]);
    setName("");
    setParentId("");
  };

  // Function to toggle task status
  const toggleStatus = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, status: task.status === "DONE" ? "IN PROGRESS" : "DONE" };
        }
        return task;
      })
    );
  };

  // Filter tasks based on selection
  const filteredTasks = tasks.filter((task) => filter === "ALL" || task.status === filter);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Task Manager</h1>

      {/* Task Creation Form */}
      <div className="mb-4">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Task Name" className="form-control mb-2" />
        <select value={parentId} onChange={(e) => setParentId(e.target.value === "" ? "" : Number(e.target.value))} className="form-select mb-2">
          <option value="">No Parent</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.name}
            </option>
          ))}
        </select>
        <button onClick={addTask} className="btn btn-primary">
          Add Task
        </button>
      </div>

      {/* Filter Tasks */}
      <div className="mb-4">
        <label className="me-2">Filter:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="form-select">
          <option value="ALL">All</option>
          <option value="IN PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
          <option value="COMPLETE">Complete</option>
        </select>
      </div>

      {/* Task List */}
      <ul className="list-group">
        {filteredTasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              {task.name} ({task.status})
            </span>
            <input type="checkbox" checked={task.status === "DONE"} onChange={() => toggleStatus(task.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
