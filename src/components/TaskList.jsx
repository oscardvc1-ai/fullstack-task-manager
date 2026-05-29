import TaskItem from './TaskItem';

export default function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask
}) {
  if (tasks.length === 0) {
    return (
      <p className="empty-message">
        No tasks found.
      </p>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}