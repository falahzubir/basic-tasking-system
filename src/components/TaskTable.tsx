import React from "react";
import TaskRow from "./TaskRow";

interface TaskTableProps {
  tasks: { id: number; name: string; status: string; parentId?: number }[];
  onToggleStatus: (id: number) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onToggleStatus }) => {
  return (
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
        {tasks.length > 0 ? (
          tasks
            .filter((task) => !task.parentId) // Get only parent tasks
            .map((task) => {
              const childTasks = tasks.filter((t) => t.parentId === task.id);
              return <TaskRow key={task.id} task={task} onToggleStatus={onToggleStatus} childTasks={childTasks} />;
            })
        ) : (
          <tr>
            <td colSpan={4}>No data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TaskTable;
