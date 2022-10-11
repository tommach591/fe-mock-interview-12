import "./Tab.css";

function Tab({ description, index, handleUpdateTab }) {
  return (
    <div
      className="Tab"
      onClick={() => {
        handleUpdateTab(index);
      }}
    >
      <h2>{description}</h2>
    </div>
  );
}

export default Tab;
