export enum StageActionType {
  SET = "set"
}

export enum Stages {
  APPROVAL = 1,
  SUMMARY = 2
}

export interface StageAction {
  type: StageActionType;
  payload: {
    newStage: number;
  };
}

export const stageReducer: React.Reducer<number, StageAction> = (state, action) => {
  switch (action.type) {
    case StageActionType.SET:
      return action.payload.newStage;
    default:
      return action.payload.newStage;
  }
};
