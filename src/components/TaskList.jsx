import TaskItem from './TaskItem';

export default function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onUpdateTask
}) {
  if (tasks.length === 0) {
  return (
    <div className="empty-state">
      No tasks found.
    </div>
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
          onUpdateTask={onUpdateTask}
        />
      ))}
    </div>
  );
}