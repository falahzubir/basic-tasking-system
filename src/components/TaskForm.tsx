import React, { useState } from "react";

interface TaskFormProps {
  tasks: { id: number; name: string }[];
  onAddTask: (name: string, parentId?: number) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ tasks, onAddTask }) => {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState<number | "">("");

  const handleSubmit = () => {
    if (name.trim()) {
      onAddTask(name, parentId === "" ? undefined : parentId);
      setName("");
      setParentId("");
    }
  };

  return (
    <div className="mb-4">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="What the task sir?" className="form-control mb-2" />
      {tasks.length > 0 && (
        <select value={parentId} onChange={(e) => setParentId(e.target.value === "" ? "" : Number(e.target.value))} className="form-select mb-2">
          <option selected disabled>Choose task parent</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.name}
            </option>
          ))}
        </select>
      )}
      <button onClick={handleSubmit} className="btn btn-primary">
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
