import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { stageContext } from "../App";
import { Stages } from "../reducers";

function Summary() {
  const { stage } = useContext(stageContext);
  const history = useHistory();
  useEffect(() => {
    if (stage !== Stages.SUMMARY) history.push("/");
  }, [stage, history]);
  return <div>Summary page</div>;
}

export default Summary;
