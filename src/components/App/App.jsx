import "./App.css";
import { useState, useRef } from "react";
import { colors } from "../../utils/helper";
import Header from "../Header";
import Modal from "../Modal";
import TaskGrid from "../TaskGrid";
import ColorBar from "../ColorBar";

function App() {
  const [modalState, setModalState] = useState("");
  const textRef = useRef(null);
  const [tabs, setTabs] = useState(["New"]);
  const [userTasks, setUserTasks] = useState([[]]);
  const [userTasksColor, setUserTasksColor] = useState([[]]);
  const [column, setColumn] = useState(0);
  const [row, setRow] = useState(0);
  const [dropBarOn, setDropBarOn] = useState(false);

  let updateColor = (color) => {
    if (userTasksColor[column][row].includes(color)) {
      let updatedUserTasksColor = [...userTasksColor];
      updatedUserTasksColor[column][row].splice(
        updatedUserTasksColor[column][row].indexOf(color),
        1
      );
      setUserTasksColor(updatedUserTasksColor);
    } else {
      let updatedUserTasksColor = [...userTasksColor];
      updatedUserTasksColor[column][row].push(color);
      setUserTasksColor(updatedUserTasksColor);
    }
  };

  let dragAndDropTask = (draggedTaskColumn, draggedTaskRow, newColumn) => {
    let updatedUserTasks = [...userTasks];
    let removedTask = updatedUserTasks[draggedTaskColumn][draggedTaskRow];
    updatedUserTasks[draggedTaskColumn].splice(draggedTaskRow, 1);
    updatedUserTasks[newColumn].push(removedTask);
    setUserTasks(updatedUserTasks);

    let updatedUserTasksColor = [...userTasksColor];
    let removedTaskColor =
      updatedUserTasksColor[draggedTaskColumn][draggedTaskRow];
    updatedUserTasksColor[draggedTaskColumn].splice(draggedTaskRow, 1);
    updatedUserTasksColor[newColumn].push(removedTaskColor);
    setUserTasksColor(updatedUserTasksColor);
  };

  let handleAddNewTab = () => {
    setModalState("AddNewTab");
  };

  let handleUpdateTab = (index) => {
    setColumn(index);
    setModalState("UpdateTab");
  };

  let handleDeleteTab = () => {
    setModalState("DeleteTab");
  };

  let handleAddNewTask = (index) => {
    setColumn(index);
    setModalState("AddNewTask");
  };

  let handleUpdateTask = (c, r) => {
    setColumn(c);
    setRow(r);
    setModalState("UpdateTask");
  };

  let handleDeleteTask = () => {
    setModalState("DeleteTask");
  };

  let addNewTabModal = () => {
    return (
      <Modal>
        <input
          className="Input"
          ref={textRef}
          type="text"
          placeholder="Tab Name..."
        />
        <div className="ButtonContainer">
          <button
            className="Button"
            onClick={() => {
              setModalState("");
            }}
          >
            Cancel
          </button>
          <button
            className="Button"
            onClick={() => {
              let updatedTabs = [...tabs];
              updatedTabs.push(textRef.current.value);
              setTabs(updatedTabs);
              let updatedUserTasks = [...userTasks];
              updatedUserTasks.push([]);
              setUserTasks(updatedUserTasks);
              let updatedUserTasksColor = [...userTasksColor];
              updatedUserTasksColor.push([]);
              setUserTasksColor(updatedUserTasksColor);
              setModalState("");
            }}
          >
            Submit
          </button>
        </div>
      </Modal>
    );
  };

  let updateTabModal = () => {
    return (
      <Modal>
        <input
          className="Input"
          ref={textRef}
          type="text"
          defaultValue={tabs[column]}
        />
        <div
          className="DeleteButton"
          onClick={() => {
            handleDeleteTab();
          }}
        >
          Delete
        </div>
        <div className="ButtonContainer">
          <button
            className="Button"
            onClick={() => {
              setModalState("");
            }}
          >
            Cancel
          </button>
          <button
            className="Button"
            onClick={() => {
              let updatedTabs = [...tabs];
              updatedTabs[column] = textRef.current.value;
              setTabs(updatedTabs);
              setModalState("");
            }}
          >
            Save
          </button>
        </div>
      </Modal>
    );
  };

  let deleteTabModal = () => {
    return (
      <Modal>
        <div>Are you sure you want to delete this column?</div>
        <div className="ButtonContainer">
          <button
            className="Button"
            onClick={() => {
              setModalState("UpdateTab");
            }}
          >
            No
          </button>
          <button
            className="Button"
            onClick={() => {
              let updatedTabs = [...tabs];
              updatedTabs.splice(column, 1);
              setTabs(updatedTabs);
              let updatedUserTasks = [...userTasks];
              updatedUserTasks.splice(column, 1);
              setUserTasks(updatedUserTasks);
              let updatedUserTasksColor = [...userTasksColor];
              updatedUserTasksColor.splice(column, 1);
              setUserTasksColor(updatedUserTasksColor);
              setModalState("");
            }}
          >
            Yes
          </button>
        </div>
      </Modal>
    );
  };

  let addNewTaskModal = () => {
    return (
      <Modal>
        <textarea
          className="Input"
          ref={textRef}
          rows="9"
          cols="40"
          style={{ resize: "none" }}
          placeholder="Notes..."
        />
        <div className="ButtonContainer">
          <button
            className="Button"
            onClick={() => {
              setModalState("");
            }}
          >
            Cancel
          </button>
          <button
            className="Button"
            onClick={() => {
              let updatedUserTasks = [...userTasks];
              updatedUserTasks[column].push(textRef.current.value);
              setUserTasks(updatedUserTasks);
              let updatedUserTasksColor = [...userTasksColor];
              updatedUserTasksColor[column].push([]);
              setUserTasksColor(updatedUserTasksColor);
              setModalState("");
            }}
          >
            Submit
          </button>
        </div>
      </Modal>
    );
  };

  let updateTaskModal = () => {
    return (
      <Modal>
        <textarea
          className="Input"
          ref={textRef}
          rows="9"
          cols="40"
          style={{ resize: "none" }}
          defaultValue={userTasks[column][row]}
        />
        <div
          className="ColorTagContainer"
          onClick={() => {
            setDropBarOn(!dropBarOn);
          }}
        >
          {userTasksColor[column][row].map((color) => {
            return (
              <div
                className="ColorTag"
                key={`${column}${row}${color}`}
                style={{ background: color }}
              ></div>
            );
          })}
          <div className={dropBarOn ? "Arrow Up" : "Arrow Down"} />
        </div>
        {dropBarOn ? (
          <div className="ColorTagOptions">
            <ColorBar
              updateColor={updateColor}
              task={userTasksColor[column][row]}
              color={colors[0]}
            />
            <ColorBar
              updateColor={updateColor}
              task={userTasksColor[column][row]}
              color={colors[1]}
            />
            <ColorBar
              updateColor={updateColor}
              task={userTasksColor[column][row]}
              color={colors[2]}
            />
            <ColorBar
              updateColor={updateColor}
              task={userTasksColor[column][row]}
              color={colors[3]}
            />
            <ColorBar
              updateColor={updateColor}
              task={userTasksColor[column][row]}
              color={colors[4]}
            />
          </div>
        ) : (
          <div></div>
        )}
        <div
          className="DeleteButton"
          onClick={() => {
            handleDeleteTask();
          }}
        >
          Delete
        </div>
        <div className="ButtonContainer">
          <button
            className="Button"
            onClick={() => {
              setModalState("");
            }}
          >
            Cancel
          </button>
          <button
            className="Button"
            onClick={() => {
              let updatedUserTasks = [...userTasks];
              updatedUserTasks[column][row] = textRef.current.value;
              setUserTasks(updatedUserTasks);
              setModalState("");
            }}
          >
            Save
          </button>
        </div>
      </Modal>
    );
  };

  let deleteTaskModal = () => {
    return (
      <Modal>
        <div>Are you sure you want to delete this task?</div>
        <div className="ButtonContainer">
          <button
            className="Button"
            onClick={() => {
              setModalState("UpdateTask");
            }}
          >
            No
          </button>
          <button
            className="Button"
            onClick={() => {
              let updatedUserTasks = [...userTasks];
              updatedUserTasks[column].splice(row, 1);
              setUserTasks(updatedUserTasks);
              let updatedUserTasksColor = [...userTasksColor];
              updatedUserTasksColor[column].splice(row, 1);
              setUserTasksColor(updatedUserTasksColor);
              setModalState("");
            }}
          >
            Yes
          </button>
        </div>
      </Modal>
    );
  };

  return (
    <div className="App">
      <Header
        tabs={tabs}
        handleAddNewTab={handleAddNewTab}
        handleUpdateTab={handleUpdateTab}
      />
      <TaskGrid
        userTasks={userTasks}
        userTasksColor={userTasksColor}
        handleAddNewTask={handleAddNewTask}
        handleUpdateTask={handleUpdateTask}
        dragAndDropTask={dragAndDropTask}
      />
      {modalState === "AddNewTab" ? addNewTabModal() : <div />}
      {modalState === "UpdateTab" ? updateTabModal() : <div />}
      {modalState === "DeleteTab" ? deleteTabModal() : <div />}
      {modalState === "AddNewTask" ? addNewTaskModal() : <div />}
      {modalState === "UpdateTask" ? updateTaskModal() : <div />}
      {modalState === "DeleteTask" ? deleteTaskModal() : <div />}
    </div>
  );
}

export default App;
