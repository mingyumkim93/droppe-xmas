import React, { useContext } from "react";
import { stageContext } from "../App";
import { StageActionType, Stages } from "../reducers/stageReducer";
import { useHistory } from "react-router";
import "./CheckOutModal.scss";

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
