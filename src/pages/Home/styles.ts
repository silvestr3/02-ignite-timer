import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

const BaseButton = styled.button`
  width: 100%;
  height: 4rem;
  border-radius: 8px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  color: ${(props) => props.theme["gray-100"]};

  &:focus {
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StartCountdownButton = styled(BaseButton)`
  background-color: ${(props) => props.theme["green-500"]};

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme["green-700"]};
  }
`;

export const StopCountdownButton = styled(BaseButton)`
  background-color: ${(props) => props.theme["red-500"]};

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme["red-700"]};
  }
`;
