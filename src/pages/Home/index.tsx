import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from "./styles";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

const formSchema = z.object({
  task: z.string().min(1, "Informe a tarefa"),
  minutesAmount: z.number().min(5).max(60),
});

type FormData = z.infer<typeof formSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
}

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPast, setAmountSecondsPast] = useState<number>(0);

  const { register, handleSubmit, watch, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const task = watch("task");

  const activeCycle = cycles.find((item) => item.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPast : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  function handleCreateNewCycle(data: FormData) {
    setAmountSecondsPast(0);

    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((current) => [...current, newCycle]);
    setActiveCycleId(newCycle.id);

    reset();
  }

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPast(
          differenceInSeconds(new Date(), activeCycle.startDate)
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${activeCycle?.task} ${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            placeholder="Dê um nome para seu projeto"
            type="text"
            list="task-suggestions"
            id="task"
            {...register("task")}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
            <option value="Projeto 5" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            placeholder="00"
            step={5}
            min={5}
            max={60}
            type="number"
            id="minutesAmount"
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton disabled={!task} type="submit">
          <Play size={24} /> Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
};
