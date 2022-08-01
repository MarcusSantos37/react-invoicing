import { Button } from "react-bootstrap";
import styled from "styled-components";

interface StyledButtonProps {
  hide: boolean;
}

export const StyledButton = styled(Button)<StyledButtonProps>`
  display: ${(props) => (props.hide ? "none" : "auto")};
`;
