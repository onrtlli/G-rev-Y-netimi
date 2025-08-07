import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setTasks(savedTasks);
    setDarkMode(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleAddTask = (task, description, date) => {
    const newTask = {
      id: Date.now(),
      text: task,
      description: description,
      date: date,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText, newDescription = '', newDate = '') => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: newText, description: newDescription, date: newDate } : task
    ));
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <div className="header">
          <div className="header-content">
            <h1 className="title">📝 Görev Listesi</h1>
            <p className="subtitle">
              {totalCount > 0 
                ? `${completedCount}/${totalCount} görev tamamlandı` 
                : 'Görevlerini organize et'}
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {totalCount > 0 && (
          <div className="progress-container">
            <div className="progress-header">
              <span className="progress-label">İlerleme</span>
              <span className="progress-percentage">
                {Math.round((completedCount / totalCount) * 100)}%
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        )}

        <TaskForm onAddTask={handleAddTask} darkMode={darkMode} />

        <TaskList
          tasks={tasks}
          onToggleComplete={toggleComplete}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default App;