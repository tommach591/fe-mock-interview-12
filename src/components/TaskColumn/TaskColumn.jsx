import "./TaskColumn.css";
import { useDrop } from "react-dnd";
import Task from "../Task";
import NewTask from "../NewTask";

function TaskColumn({
  userTasks,
  handleUpdateTask,
  handleAddNewTask,
  dragAndDropTask,
  userTasksColumn,
  column,
  userTasksColor,
}) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "TASK",
      drop: (monitor) => {
        dragAndDropTask(monitor.column, monitor.row, column);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [userTasks, column]
  );

  let getTasksInColumn = () => {
    const tasksInColumn = [];
    userTasksColumn.forEach((task, rowIndex) => {
      tasksInColumn.push(
        <Task
          handleUpdateTask={handleUpdateTask}
          column={column}
          row={rowIndex}
          task={task}
          userTasksColor={userTasksColor}
          key={`row-${rowIndex}`}
        />
      );
    });
    return tasksInColumn;
  };

  return (
    <div
      className="TaskColumn"
      ref={drop}
      style={isOver ? { border: "1px dashed black" } : {}}
    >
      {getTasksInColumn()}
      <NewTask handleAddNewTask={handleAddNewTask} index={column} />
    </div>
  );
}

export default TaskColumn;
