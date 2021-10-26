import React, { useContext, useEffect, useState } from "react";
import "./Summary.css";
import { useHistory } from "react-router";
import { stageContext } from "../App";
import { Stages } from "../reducers";

function Summary() {
  const { stage } = useContext(stageContext);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    if (stage !== Stages.SUMMARY) history.push("/");
  }, [stage, history]);
  return <div className="page-container">Summary page</div>;
}

export default Summary;
