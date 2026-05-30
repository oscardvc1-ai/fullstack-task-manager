import { useState } from 'react';

export default function TaskItem({
  task,
  onToggleTask,
  onDeleteTask,
  onUpdateTask
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanTitle = newTitle.trim();

    if (!cleanTitle) return;

    onUpdateTask(task._id, cleanTitle);
    setIsEditing(false);
  };

  return (
    <article className="task-item">
      {isEditing ? (
        <form className="edit-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            autoFocus
          />

          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task._id)}
            />

            <span
              className={task.completed ? 'completed' : ''}
              onDoubleClick={() => setIsEditing(true)}
            >
              {task.title}
            </span>
          </label>

          <div className="task-actions">
            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => onDeleteTask(task._id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </article>
  );
}