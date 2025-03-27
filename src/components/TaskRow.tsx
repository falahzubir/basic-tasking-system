import React from "react";

interface TaskRowProps {
  task: { id: number; name: string; status: string };
  level: number;
  onToggleStatus: (id: number) => void;
}

const TaskRow: React.FC<TaskRowProps> = ({ task, level, onToggleStatus }) => {
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
    <tr>
      <td>{task.id}</td>
      <td style={{ paddingLeft: `${level * 20}px` }}>{task.name}</td>
      <td>
        <span className={getBadgeClass(task.status)}>{task.status}</span>
      </td>
      <td>
        <input type="checkbox" checked={task.status === "DONE"} onChange={() => onToggleStatus(task.id)} />
      </td>
    </tr>
  );
};

export default TaskRow;
