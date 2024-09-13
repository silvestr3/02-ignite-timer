import { Cycle } from "../../context/CyclesContext";
import { ActionTypes } from "./actions";

interface CycleActions {
  type: ActionTypes;
  payload?: any;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action: CycleActions) {
  switch (action.type) {
    case ActionTypes.ADD_NEW:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      };
    case ActionTypes.FINISH_CURRENT:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() };
          } else {
            return cycle;
          }
        }),
        activeCycleId: null,
      };
    case ActionTypes.INTERRUPT_CURRENT:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() };
          } else {
            return cycle;
          }
        }),
        activeCycleId: null,
      };
    default:
      return state;
  }
}
