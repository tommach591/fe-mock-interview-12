import "./NewTask.css";

function NewTask({ handleAddNewTask, index }) {
  return (
    <div
      className="NewTask"
      onClick={() => {
        handleAddNewTask(index);
      }}
    >
      <h2>+</h2>
    </div>
  );
}

export default NewTask;
