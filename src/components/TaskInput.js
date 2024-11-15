import React, { useState } from 'react';

const TaskInput = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleSubmit = e => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title, priority);
      setTitle('');
    }
  };

  return (
    <div className="task-input-section">
      <form className="task-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new task"
          required
        />
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskInput;
