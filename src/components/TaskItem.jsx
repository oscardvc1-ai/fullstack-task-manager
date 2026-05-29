export default function TaskItem({
  task,
  onToggleTask,
  onDeleteTask
}) {
  return (
    <article className="task-item">
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task._id)}
        />

        <span className={task.completed ? 'completed' : ''}>
          {task.title}
        </span>
      </label>

      <button
        className="delete-btn"
        onClick={() => onDeleteTask(task._id)}
      >
        Delete
      </button>
    </article>
  );
}
