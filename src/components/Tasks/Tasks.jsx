import "./Tasks.css";
import NewTask from "../NewTask";

function Tasks({ userTasks, handleAddNewTask }) {
  let getAllTasks = () => {
    const tasksForEachColumn = [];
    userTasks.forEach((column, columnIndex) => {
      const tasksInColumn = [];
      column.forEach((task, rowIndex) => {
        tasksInColumn.push(
          <div className="Task" key={`row-${rowIndex}`}>
            <p style={{ margin: "5px" }}>{task}</p>
          </div>
        );
      });
      tasksForEachColumn.push(
        <div className="Column" key={`column-${columnIndex}`}>
          {tasksInColumn}
          <NewTask handleAddNewTask={handleAddNewTask} index={columnIndex} />
        </div>
      );
    });

    return tasksForEachColumn;
  };
  return <div className="Tasks">{getAllTasks()}</div>;
}

export default Tasks;
