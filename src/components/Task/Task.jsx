import "./Task.css";
import { useDrag } from "react-dnd";

function Task({ handleUpdateTask, column, row, task, userTasksColor }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: "TASK",
      item: { column: column, row: row },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [column, row]
  );

  return (
    <div
      className="Task"
      onClick={() => {
        handleUpdateTask(column, row);
      }}
      ref={drag}
    >
      <p style={{ margin: "5px" }}>{task}</p>
      <div className="ActiveColorTags">
        {userTasksColor[column][row].map((color) => {
          return (
            <div
              className="ColorCircle"
              key={`${column}${row}${color}`}
              style={{ background: color }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Task;
