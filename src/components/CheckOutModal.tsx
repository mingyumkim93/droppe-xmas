import React from "react";
import "./CheckOutModal.css";

interface CheckOutModalProps {
  closeModal: () => void;
}

function CheckOutModal({ closeModal }: CheckOutModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Confirmation</h3>
        </div>
        <div className="modal-contents">
          <div>Save change?</div>
        </div>
        <div className="modal-actions">
          <button onClick={closeModal}>Cancel</button>
          <button>Yes</button>
        </div>
      </div>
    </div>
  );
}

export default CheckOutModal;
