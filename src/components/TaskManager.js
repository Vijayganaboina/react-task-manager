import React, { useState, useEffect } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import SearchBar from "./SearchBar";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("date");

  // Load tasks from local storage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (title, priority) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        priority,
        isCompleted: false,
        dateCreated: new Date(),
      },
    ]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const sortedTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "priority") {
        return a.priority.localeCompare(b.priority);
      } else {
        return new Date(b.dateCreated) - new Date(a.dateCreated);
      }
    });

  return (
    <div className="task-manager">
      <SearchBar setSearchTerm={setSearchTerm} />
      <TaskInput onAddTask={addTask} />
      <label>Sort by: </label>
      <div className="dropdown-container">
        <select
          onChange={(e) => setSortCriteria(e.target.value)}
          className="modern-dropdown"
        >
          <option value="date">Date Created</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <TaskList
        tasks={sortedTasks}
        onDelete={deleteTask}
        onToggleCompletion={toggleCompletion}
      />
    </div>
  );
};

export default TaskManager;
