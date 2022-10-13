import "./ColorBar.css";

function ColorBar({ updateColor, task, color }) {
  return (
    <div
      className="ColorBar"
      style={{ background: color }}
      onClick={() => {
        updateColor(color);
      }}
    >
      {task.includes(color) ? <div className="X">❌</div> : <div />}
    </div>
  );
}

export default ColorBar;
