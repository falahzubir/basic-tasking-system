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

  // Function to determine badge color
  const getBadgeClass = (status: string) => {
    switch (status) {
      case "IN PROGRESS":
        return "badge bg-warning";
      case "DONE":
        return "badge bg-success";
      case "COMPLETE":
        return "badge bg-primary";
      default:
        return "badge bg-secondary";
    }
  };

  return (
    <div className="container mt-4 p-5">
      <h1 className="mb-4">Task Manager</h1>

      {/* Task Creation Form */}
      <div className="mb-4">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="What the task today?" className="form-control mb-2" />
        {tasks.length > 0 && (
          <select value={parentId} onChange={(e) => setParentId(e.target.value === "" ? "" : Number(e.target.value))} className="form-select mb-2">
            <option selected disabled>
              Choose your parent task
            </option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.name}
              </option>
            ))}
          </select>
        )}
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
      <table className="table table-bordered text-center" style={{ tableLayout: "fixed", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ width: "10%" }}>#</th>
            <th style={{ width: "50%" }}>Task Name</th>
            <th style={{ width: "20%" }}>Status</th>
            <th style={{ width: "20%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td>
                  <span className={getBadgeClass(task.status)}>{task.status}</span>
                </td>
                <td>
                  <input type="checkbox" checked={task.status === "DONE"} onChange={() => toggleStatus(task.id)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
