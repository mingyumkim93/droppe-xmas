import React, { useContext } from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { StageContext } from "contexts/StageContext";
import { Stages } from "reducers/stageReducer";

const ProtectedRoute = ({ ...routeProps }: RouteProps) => {
  const { stage } = useContext(StageContext);
  if (stage === Stages.SUMMARY) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to="/" />;
  }
};

export default ProtectedRoute;
