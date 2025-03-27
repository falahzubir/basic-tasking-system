import React from "react";

interface TaskFilterProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ filter, onFilterChange }) => {
  return (
    <div className="mb-4">
      <label className="me-2">Filter:</label>
      <select value={filter} onChange={(e) => onFilterChange(e.target.value)} className="form-select">
        <option value="ALL">All</option>
        <option value="IN PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
        <option value="COMPLETE">Complete</option>
      </select>
    </div>
  );
};

export default TaskFilter;
