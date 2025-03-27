import React, { JSX } from "react";
import TaskRow from "./TaskRow";

interface TaskTableProps {
  tasks: { id: number; name: string; status: string; parentId?: number }[];
  onToggleStatus: (id: number) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onToggleStatus }) => {
  const getNestedTasks = (parentId?: number, level = 0): JSX.Element[] => {
    return tasks
      .filter((task) => task.parentId === parentId)
      .map((task) => (
        <React.Fragment key={task.id}>
          <TaskRow task={task} level={level} onToggleStatus={onToggleStatus} />
          {getNestedTasks(task.id, level + 1)}
        </React.Fragment>
      ));
  };

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
          getNestedTasks()
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
