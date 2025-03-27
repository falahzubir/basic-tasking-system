import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import TaskTable from "./components/TaskTable";

// Define Task interface
interface Task {
  id: number;
  name: string;
  status: "IN PROGRESS" | "DONE" | "COMPLETE";
  parentId?: number;
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("ALL");

  // Function to add a new task
  const addTask = (name: string, parentId?: number) => {
    const newTask: Task = {
      id: tasks.length + 1,
      name,
      status: "IN PROGRESS",
      parentId,
    };
    setTasks([...tasks, newTask]);
  };

  // Function to toggle task status
  const toggleStatus = (id: number) => {
    setTasks((prevTasks) => {
      const updatedTasks: Task[] = prevTasks.map((task) => (task.id === id ? { ...task, status: task.status === "DONE" ? "IN PROGRESS" : "DONE" } : task));

      // Auto-update parent task to "COMPLETE" if all children are done
      return updatedTasks.map((task): Task => {
        if (task.status === "DONE") {
          const childTasks = updatedTasks.filter((t) => t.parentId === task.id);
          if (childTasks.length > 0 && childTasks.every((t) => t.status === "COMPLETE")) {
            return { ...task, status: "COMPLETE" };
          }
        }
        return task;
      });
    });
  };

  // Filter tasks based on selection
  const filteredTasks = tasks.filter((task) => filter === "ALL" || task.status === filter);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Task Manager</h1>
      <TaskForm tasks={tasks} onAddTask={addTask} />
      <TaskFilter filter={filter} onFilterChange={setFilter} />
      <TaskTable tasks={filteredTasks} onToggleStatus={toggleStatus} />
    </div>
  );
}
