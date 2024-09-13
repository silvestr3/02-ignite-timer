import { createContext, useEffect, useReducer, useState } from "react";
import { cyclesReducer } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  finishCurrentAction,
  InterruptCurrentAction,
} from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        "@timer:cycles-state-1.0.0"
      );

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }

      return initialState;
    }
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((item) => item.id === activeCycleId);

  const [amountSecondsPast, setAmountSecondsPast] = useState<number>(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 0;
  });

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

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem("@timer:cycles-state-1.0.0", stateJSON);
  }, [cyclesState]);

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
