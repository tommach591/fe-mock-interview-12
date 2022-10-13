import "./Header.css";
import Tab from "../Tab";
import NewTab from "../NewTab";

function Header({ tabs, handleAddNewTab, handleUpdateTab }) {
  let getListOfTabs = () => {
    const listOfTabs = [];
    tabs.forEach((element, index) => {
      listOfTabs.push(
        <Tab
          key={index}
          description={element}
          index={index}
          handleUpdateTab={handleUpdateTab}
        />
      );
    });
    return listOfTabs;
  };
  return (
    <div className="Header">
      <div className="HeaderContents">
        {getListOfTabs()}
        <NewTab handleAddNewTab={handleAddNewTab} />
      </div>
    </div>
  );
}

export default Header;
