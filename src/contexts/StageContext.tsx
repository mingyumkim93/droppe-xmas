import React, { createContext, useReducer, ReactNode } from "react";
import { StageAction, stageReducer, Stages } from "reducers/stageReducer";

export const StageContext = createContext<{ stage: number; stageDispatch: React.Dispatch<StageAction> }>({
  stage: Stages.APPROVAL,
  stageDispatch: () => null
});
interface StageContextProviderProps {
  children: ReactNode;
}
function StageContextProvider({ children }: StageContextProviderProps) {
  const [stage, stageDispatch] = useReducer(stageReducer, 1);

  return <StageContext.Provider value={{ stage, stageDispatch }}>{children}</StageContext.Provider>;
}

export default StageContextProvider;
