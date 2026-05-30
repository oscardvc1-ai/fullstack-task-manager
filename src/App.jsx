import { useEffect, useState } from 'react';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from './services/taskService';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(
    localStorage.getItem('taskFilter') || 'all'
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);
  useEffect(() => {
    localStorage.setItem('taskFilter', filter);
  }, [filter]);

  const loadTasks = async () => {
    setLoading(true);

    const data = await getTasks();

    setTasks(data);
    setLoading(false);
  };

  const addTask = async (title) => {
    const newTask = await createTask(title);

    setTasks([...tasks, newTask]);
  };

  const toggleTask = async (id) => {
    const taskToUpdate = tasks.find(
      (task) => task._id === id
    );

    const updatedTask = await updateTask(id, {
      completed: !taskToUpdate.completed
    });

    setTasks(
      tasks.map((task) =>
        task._id === id ? updatedTask : task
      )
    );
  };

  const editTask = async (id, title) => {
    const updatedTask = await updateTask(id, {
      title
    });

    setTasks(
      tasks.map((task) =>
        task._id === id ? updatedTask : task
      )
    );
  };

  const removeTask = async (id) => {
    await deleteTask(id);

    setTasks(
      tasks.filter((task) => task._id !== id)
    );
  };

  const clearCompleted = async () => {
    const completedTasks = tasks.filter(
      (task) => task.completed
    );

    for (const task of completedTasks) {
      await deleteTask(task._id);
    }

    setTasks(
      tasks.filter((task) => !task.completed)
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return !task.completed;
    }

    if (filter === 'completed') {
      return task.completed;
    }

    return true;
  });

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  return (
    <main className="app">
      <section className="task-card">
        <h1>Full Stack Task Manager</h1>

        <p className="subtitle">
          Manage your tasks with React,
          Node.js, Express and MongoDB.
        </p>

        <TaskForm onAddTask={addTask} />

        <TaskFilter
          currentFilter={filter}
          onChangeFilter={setFilter}
        />

        <p className="task-counter">
          Pending tasks: {pendingTasks}
        </p>

        <button
          className="clear-btn"
          onClick={clearCompleted}
        >
          Clear Completed
        </button>

        {loading ? (
          <div className='loading'>
            Loading tasks...
          </div>
        ) : (

        <TaskList
          tasks={filteredTasks}
          onToggleTask={toggleTask}
          onDeleteTask={removeTask}
          onUpdateTask={editTask}
        />
        )}
      </section>
      <footer className="footer">
        <p>© 2026 Óscar Díaz Valero Castro</p>
        <p>Built with React, Node.js, Express and MongoDB</p>
        <a href="https://github.com/oscardvc1-ai/fullstack-task-manager"
        target="_blank" rel="noreferrer">GitHub Repository</a>
      </footer>
    </main>
  );
}