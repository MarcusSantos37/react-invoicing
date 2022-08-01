import styled from "styled-components";

export const Container = styled.div`
  #imgInp {
    display: none;
  }

  .branding {
    padding-bottom: 2em;
    border-bottom: 1px solid #ddd;
  }

  .heading {
    background-color: #357ebd;
    color: #fff;
    margin-bottom: 1em;
    text-align: center;
    line-height: 2.5em;
  }

  .invoice-number-container * {
    font-weight: bold;
  }

  .logo-container {
    text-align: right;
  }
`;

interface LogoProps {
  hide: boolean;
}

export const Logo = styled.img<LogoProps>`
  width: 300px;

  display: ${(props) => (props.hide ? "none" : "auto")};
`;

export const LogoButtons = styled.div<LogoProps>`
  display: ${(props) => (props.hide ? "none" : "auto")};

  a {
    cursor: pointer;
  }

  a:first-child {
    margin-right: 4px;
  }
`;
