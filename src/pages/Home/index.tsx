import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { useContext } from "react";
import { Countdown } from "./components/Countdown";
import { Cycle, CyclesContext } from "../../context/CyclesContext";
import { NewCycleForm } from "./components/NewCycleForm";

const formSchema = z.object({
  task: z.string().min(1, "Informe a tarefa"),
  minutesAmount: z.number().min(5).max(60),
});

type FormData = z.infer<typeof formSchema>;

export const Home = () => {
  const { activeCycle, addNewCycle, interruptCurrentCycle, setSecondsPast } =
    useContext(CyclesContext);

  const newCycleForm = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch("task");

  function handleCreateNewCycle(data: FormData) {
    setSecondsPast(0);

    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    addNewCycle(newCycle);
    reset();
  }

  function handleStopCycle() {
    interruptCurrentCycle();
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={handleStopCycle} type="button">
            <HandPalm size={24} /> Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={!task} type="submit">
            <Play size={24} /> Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
};
