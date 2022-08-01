import styled from "styled-components";

import { Row } from "react-bootstrap";

export const Container = styled(Row)`
  padding-top: 1em;

  a {
    margin-right: 3px;
  }

  @media print {
    display: none;
  }
`;
