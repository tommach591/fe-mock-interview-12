import "./App.css";
import Header from "../Header";
import { useState, useRef } from "react";
import Modal from "../Modal";
import Tasks from "../Tasks";

function App() {
  const [modalState, setModalState] = useState("");
  const textRef = useRef(null);
  const [tabs, setTabs] = useState(["New"]);
  const [userTasks, setUserTasks] = useState([[]]);
  const [column, setColumn] = useState(0);

  let handleAddNewTab = () => {
    setModalState("AddNewTab");
  };

  let handleAddNewTask = (index) => {
    setColumn(index);
    setModalState("AddNewTask");
  };

  let handleUpdateTab = (index) => {
    setColumn(index);
    setModalState("UpdateTab");
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
        <div className="DeleteButton">Delete</div>
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
              setModalState("");
            }}
          >
            Submit
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
      <Tasks userTasks={userTasks} handleAddNewTask={handleAddNewTask} />
      {modalState === "AddNewTab" ? addNewTabModal() : <div />}
      {modalState === "UpdateTab" ? updateTabModal() : <div />}

      {modalState === "AddNewTask" ? addNewTaskModal() : <div />}
    </div>
  );
}

export default App;
