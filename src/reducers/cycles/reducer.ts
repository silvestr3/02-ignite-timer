import { Cycle } from "../../context/CyclesContext";
import { ActionTypes } from "./actions";
import { produce } from "immer";

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
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });
    case ActionTypes.FINISH_CURRENT:
      return produce(state, (draft) => {
        const cycleIndex = state.cycles.findIndex(
          (item) => item.id === draft.activeCycleId
        );

        if (cycleIndex < 0) {
          return state;
        }

        draft.cycles[cycleIndex].finishedDate = new Date();
        draft.activeCycleId = null;
      });
    case ActionTypes.INTERRUPT_CURRENT:
      return produce(state, (draft) => {
        const cycleIndex = state.cycles.findIndex(
          (item) => item.id === draft.activeCycleId
        );

        if (cycleIndex < 0) {
          return state;
        }

        draft.cycles[cycleIndex].interruptedDate = new Date();
        draft.activeCycleId = null;
      });
    default:
      return state;
  }
}
