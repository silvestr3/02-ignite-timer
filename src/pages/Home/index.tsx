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

const formSchema = z.object({
  task: z.string().min(1, "Informe a tarefa"),
  minutesAmount: z.number().min(5).max(60),
});

type FormData = z.infer<typeof formSchema>;

export const Home = () => {
  const { register, handleSubmit, watch, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const task = watch("task");

  function handleCreateNewCycle(data: FormData) {
    console.log(data);

    reset();
  }

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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={!task} type="submit">
          <Play size={24} /> Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
};
