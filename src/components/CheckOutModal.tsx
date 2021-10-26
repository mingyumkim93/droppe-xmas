import React, { useContext } from "react";
import { stageContext } from "../App";
import { StageActionType, Stages } from "../reducers";
import { useHistory } from "react-router";
import "./CheckOutModal.css";

interface CheckOutModalProps {
  closeModal: () => void;
}

function CheckOutModal({ closeModal }: CheckOutModalProps) {
  const { stageDispatch } = useContext(stageContext);
  const history = useHistory();

  function handleCheckOut() {
    stageDispatch({ type: StageActionType.SET, payload: { newStage: Stages.SUMMARY } });
    history.push("/summary");
  }

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
          <button onClick={handleCheckOut}>Yes</button>
        </div>
      </div>
    </div>
  );
}

export default CheckOutModal;
