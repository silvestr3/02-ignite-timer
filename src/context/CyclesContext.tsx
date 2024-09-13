import { createContext, useReducer, useState } from "react";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycleId: string | null;
  activeCycle: Cycle | undefined;
  amountSecondsPast: number;
  markCurrentCycleAsFinished: () => void;
  interruptCurrentCycle: () => void;
  addNewCycle: (newCycle: Cycle) => void;
  setSecondsPast: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CycleActions {
  type: "FINISH_CURRENT" | "INTERRUPT_CURRENT" | "ADD_NEW";
  payload: any;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function CyclesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: CycleActions) => {
      switch (action.type) {
        case "ADD_NEW":
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          };
        case "FINISH_CURRENT":
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
        case "INTERRUPT_CURRENT":
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
    },
    {
      cycles: [],
      activeCycleId: null,
    }
  );

  const { cycles, activeCycleId } = cyclesState;

  const [amountSecondsPast, setAmountSecondsPast] = useState<number>(0);

  const activeCycle = cycles.find((item) => item.id === activeCycleId);

  function setSecondsPast(seconds: number) {
    setAmountSecondsPast(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: "FINISH_CURRENT",
      payload: {
        activeCycleId,
      },
    });
  }

  function interruptCurrentCycle() {
    dispatch({
      type: "INTERRUPT_CURRENT",
      payload: {
        activeCycleId,
      },
    });
  }

  function addNewCycle(newCycle: Cycle) {
    dispatch({
      type: "ADD_NEW",
      payload: {
        newCycle,
      },
    });
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPast,
        markCurrentCycleAsFinished,
        interruptCurrentCycle,
        addNewCycle,
        setSecondsPast,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
