import { Cycle } from "../../context/CyclesContext";

export enum ActionTypes {
  ADD_NEW = "ADD_NEW",
  FINISH_CURRENT = "FINISH_CURRENT",
  INTERRUPT_CURRENT = "INTERRUPT_CURRENT",
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW,
    payload: {
      newCycle,
    },
  };
}

export function finishCurrentAction() {
  return {
    type: ActionTypes.FINISH_CURRENT,
  };
}

export function InterruptCurrentAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT,
  };
}
