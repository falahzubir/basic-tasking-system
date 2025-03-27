import React from "react";

interface TaskRowProps {
  task: { id: number; name: string; status: string; parentId?: number };
  onToggleStatus: (id: number) => void;
  childTasks: { id: number; name: string; status: string; parentId?: number }[];
}

const TaskRow: React.FC<TaskRowProps> = ({ task, onToggleStatus, childTasks }) => {
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
    <>
      <tr>
        <td>{task.id}</td>
        {/* Task Name Column */}
        <td className="text-start">
          <div>{task.name}</div>
          {childTasks.length > 0 && (
            <ul style={{ listStyleType: "none", paddingLeft: "20px", margin: "0" }}>
              {childTasks.map((child) => (
                <li key={child.id} style={{ padding: "3px 0" }}>
                  - {child.name}
                </li>
              ))}
            </ul>
          )}
        </td>
        {/* Status Column */}
        <td>
          <div>
            <span className={getBadgeClass(task.status)}>{task.status}</span>
          </div>
          {childTasks.length > 0 && (
            <ul style={{ listStyleType: "none", paddingLeft: "0", margin: "0" }}>
              {childTasks.map((child) => (
                <li key={child.id} style={{ padding: "3px 0" }}>
                  <span className={getBadgeClass(child.status)}>{child.status}</span>
                </li>
              ))}
            </ul>
          )}
        </td>
        {/* Action Column */}
        <td>
          <div>
            <input type="checkbox" checked={task.status === "DONE"} onChange={() => onToggleStatus(task.id)} />
          </div>
          {childTasks.length > 0 && (
            <ul style={{ listStyleType: "none", paddingLeft: "0", margin: "0" }}>
              {childTasks.map((child) => (
                <li key={child.id} style={{ padding: "3px 0" }}>
                  <input type="checkbox" checked={child.status === "DONE"} onChange={() => onToggleStatus(child.id)} />
                </li>
              ))}
            </ul>
          )}
        </td>
      </tr>
    </>
  );
};

export default TaskRow;
