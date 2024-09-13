import { useContext } from "react";
import { HistoryContainer, HistoryList, StatusCell } from "./styles";
import { CyclesContext } from "../../context/CyclesContext";
import { formatDistanceToNow } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";

export const History = () => {
  const { cycles } = useContext(CyclesContext);

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    //@ts-expect-error
                    locale: ptBr,
                  })}
                </td>
                <td>
                  {cycle.finishedDate && (
                    <StatusCell statusColor="green">Concluído</StatusCell>
                  )}

                  {cycle.interruptedDate && (
                    <StatusCell statusColor="red">Interrompido</StatusCell>
                  )}

                  {!cycle.interruptedDate && !cycle.finishedDate && (
                    <StatusCell statusColor="yellow">Em andamento</StatusCell>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
};
