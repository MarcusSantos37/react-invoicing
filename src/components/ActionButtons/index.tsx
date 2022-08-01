import { StyledButton } from "../Button";
import { Container } from "./styles";

interface ActionButtonsProps {
  printMode: boolean;
  setPrintMode: (value: boolean) => void;
  clearLocalStorage: () => void;
}

export function ActionButtons({
  clearLocalStorage,
  printMode,
  setPrintMode,
}: ActionButtonsProps) {
  const printInfo = () => {
    window.print();
  };

  return (
    <Container>
      <StyledButton
        href="#"
        variant="primary"
        hide={!printMode}
        onClick={printInfo}
      >
        Print
      </StyledButton>
      <StyledButton href="#" variant="primary" onClick={clearLocalStorage}>
        Reset
      </StyledButton>
      <StyledButton
        href="#"
        variant="primary"
        hide={printMode}
        onClick={() => setPrintMode(true)}
      >
        Turn On Print Mode
      </StyledButton>
      <StyledButton
        href="#"
        variant="primary"
        hide={!printMode}
        onClick={() => setPrintMode(false)}
      >
        Turn Off Print Mode
      </StyledButton>
    </Container>
  );
}
