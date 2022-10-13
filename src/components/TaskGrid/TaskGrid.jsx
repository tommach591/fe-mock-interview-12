import "./TaskGrid.css";
import TaskColumn from "../TaskColumn";

function TaskGrid({
  userTasks,
  userTasksColor,
  handleAddNewTask,
  handleUpdateTask,
  dragAndDropTask,
}) {
  let getAllTasks = () => {
    const tasksForEachColumn = [];
    userTasks.forEach((userTasksColumn, columnIndex) => {
      tasksForEachColumn.push(
        <TaskColumn
          userTasks={userTasks}
          handleUpdateTask={handleUpdateTask}
          handleAddNewTask={handleAddNewTask}
          dragAndDropTask={dragAndDropTask}
          userTasksColumn={userTasksColumn}
          column={columnIndex}
          userTasksColor={userTasksColor}
          key={`column-${columnIndex}`}
        />
      );
    });

    return tasksForEachColumn;
  };
  return <div className="TaskGrid">{getAllTasks()}</div>;
}

export default TaskGrid;
