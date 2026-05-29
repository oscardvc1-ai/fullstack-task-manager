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
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();

    setTasks(data);
  };

  const addTask = async (title) => {
    const newTask = await createTask(title);

    setTasks([...tasks, newTask]);
  };

  const toggleTask = async (id) => {
    const taskToUpdate = tasks.find((task) => task._id === id);

    const updatedTask = await updateTask(id, {
      completed: !taskToUpdate.completed
    });

    setTasks(
      tasks.map((task) =>
        task._id === id ? updatedTask : task
      )
    );
  };

  const removeTask = async (id) => {
    await deleteTask(id);

    setTasks(tasks.filter((task) => task._id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;

    return true;
  });

  return (
    <main className="app">
      <section className="task-card">
        <h1>Full Stack Task Manager</h1>
        <p className="subtitle">
          Manage your tasks with React, Node.js, Express and MongoDB.
        </p>

        <TaskForm onAddTask={addTask} />

        <TaskFilter
          currentFilter={filter}
          onChangeFilter={setFilter}
        />

        <TaskList
          tasks={filteredTasks}
          onToggleTask={toggleTask}
          onDeleteTask={removeTask}
        />
      </section>
    </main>
  );
}