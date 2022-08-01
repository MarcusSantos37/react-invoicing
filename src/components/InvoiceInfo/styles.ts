import { Row } from "react-bootstrap";
import styled from "styled-components";

interface InputContainerProps {
  hide?: boolean;
}

export const InputContainer = styled.div<InputContainerProps>`
  padding: 3px 0;

  display: ${(props) => (props.hide ? "none" : "auto")};
`;

export const InfoContainer = styled(Row)`
  .right {
    text-align: right;

    input {
      text-align: right;
    }
  }

  input {
    width: 300px;
  }
`;
