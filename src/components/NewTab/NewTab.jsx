import "./NewTab.css";

function NewTab({ handleAddNewTab }) {
  return (
    <div
      className="NewTab"
      onClick={() => {
        handleAddNewTab();
      }}
    >
      <h2>+</h2>
    </div>
  );
}

export default NewTab;
