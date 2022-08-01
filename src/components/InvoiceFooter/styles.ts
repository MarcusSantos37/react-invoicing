import styled from "styled-components";

interface ContainerProps {
  hide: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: ${(props) => (props.hide ? "none" : "auto")};

  font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva,
    Verdana, sans-serif;
  width: 100%;
  margin: 40px 0 20px 0;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
  color: #404040;
  cursor: default;
  line-height: 1.4em;

  .love {
    display: inline-block;
    position: relative;
    color: #ce0c15;
  }
`;
