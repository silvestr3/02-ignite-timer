import { useContext } from "react";
import {
  FormContainer,
  TaskInput,
  MinutesAmountInput,
  ActiveCycleTitle,
} from "./styles";
import { CyclesContext } from "../../../../context/CyclesContext";
import { useFormContext } from "react-hook-form";

export const NewCycleForm = () => {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <>
      {activeCycle ? (
        <ActiveCycleTitle>Trabalhando em {activeCycle.task}</ActiveCycleTitle>
      ) : (
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
      )}
    </>
  );
};
