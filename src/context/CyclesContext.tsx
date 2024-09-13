import { createContext, useReducer, useState } from "react";
import { cyclesReducer } from "../reducers/cycles/reducer";
import {
  ActionTypes,
  addNewCycleAction,
  finishCurrentAction,
  InterruptCurrentAction,
} from "../reducers/cycles/actions";

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

export function CyclesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });

  const { cycles, activeCycleId } = cyclesState;

  const [amountSecondsPast, setAmountSecondsPast] = useState<number>(0);

  const activeCycle = cycles.find((item) => item.id === activeCycleId);

  function setSecondsPast(seconds: number) {
    setAmountSecondsPast(seconds);
  }

  function markCurrentCycleAsFinished() {
    dispatch(finishCurrentAction());
  }

  function interruptCurrentCycle() {
    dispatch(InterruptCurrentAction());
  }

  function addNewCycle(newCycle: Cycle) {
    dispatch(addNewCycleAction(newCycle));
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
