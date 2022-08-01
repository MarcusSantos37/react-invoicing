import { Col, Row } from "react-bootstrap";
import styled from "styled-components";

interface ContainerProps {
  hide: boolean;
}

export const Container = styled(Col)<ContainerProps>`
  display: ${(props) => (props.hide ? "none" : "auto")};
`;

export const ItemsTable = styled.div`
  .row {
    border-bottom: 1px solid #ddd;
    line-height: 3em;
  }
  .row:last-child {
    border-bottom: none;
    line-height: 3em;
  }

  .row:nth-child(even) {
    background: #f9f9f9;
  }

  input {
    line-height: 1.5em;
  }
`;

export const TableHeader = styled(Row)`
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
`;
