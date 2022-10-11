import "./Modal.css";

function Modal({ children }) {
  return (
    <div className="Modal">
      <div className="ModalBackground" />
      <div className="ModalContents">{children}</div>
    </div>
  );
}

export default Modal;
