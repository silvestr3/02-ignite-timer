import { createContext, useState } from "react";

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
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPast, setAmountSecondsPast] = useState<number>(0);

  const activeCycle = cycles.find((item) => item.id === activeCycleId);

  function setSecondsPast(seconds: number) {
    setAmountSecondsPast(seconds);
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) => {
      return state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      });
    });
    setActiveCycleId(null);
  }

  function interruptCurrentCycle() {
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  }

  function addNewCycle(newCycle: Cycle) {
    setCycles((current) => [...current, newCycle]);
    setActiveCycleId(newCycle.id);
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
