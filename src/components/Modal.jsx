import { createPortal } from "react-dom";

function Modal({ isOpen, open, title, body, children }) {
  const modalRoot = document.getElementById("modal");
  return (
    <>
      {isOpen &&
        createPortal(
          <div
            className="modal"
            onClick={() => open(false)}
            style={{ display: "block" }}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{title}</h5>
                  <button
                    type="button"
                    className="btn-close ms-0"
                    onClick={() => open(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>{body}</p>
                </div>
                <div className="modal-footer">{children}</div>
              </div>
            </div>
          </div>,
          modalRoot
        )}
    </>
  );
}
export default Modal;
