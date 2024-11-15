import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskList = ({ tasks, onDelete, onToggleCompletion }) => (
  <div className="task-list-section">
    <ul className="task-list">
      <AnimatePresence>
        {tasks.map(task => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className={`task-item ${task.isCompleted ? 'completed' : ''}`}
          >
            <div className={`task-title ${task.isCompleted ? 'task-completed' : ''}`}>
              {task.title}
            </div>
            <div className={`priority ${task.priority}`}>{task.priority}</div>
            <button
              className="task-complete"
              onClick={() => onToggleCompletion(task.id)}
              title="Mark as completed"
            >
              {task.isCompleted ? '✅' : '◻️'}
            </button>
            <button className="task-delete" onClick={() => onDelete(task.id)}>
              🗑️
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  </div>
);

export default TaskList;
