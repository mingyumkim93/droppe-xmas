import React from "react";
import "./CheckOutModal.scss";

interface CheckOutModalProps {
  closeModal: () => void;
  handleCheckOut: () => void;
}

function CheckOutModal({ closeModal, handleCheckOut }: CheckOutModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Confirmation</h3>
        </div>
        <div className="modal-contents">
          <div>Your selection of products are about to be saved. Proceed?</div>
        </div>
        <div className="modal-actions">
          <button onClick={closeModal}>Cancel</button>
          <button onClick={handleCheckOut}>Proceed</button>
        </div>
      </div>
    </div>
  );
}

export default CheckOutModal;
