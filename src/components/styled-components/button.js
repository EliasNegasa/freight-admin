import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  display: block;
  padding: 12px 0;
  margin: 2rem 0 0;
  width: 200px;
  font-weight: 700;
  color: ${(props) => props.theme.secondary} !important;
  background-color: ${(props) => props.theme.primary};
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 35px;
  cursor: pointer;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  outline: none;

  ${(props) =>
    props.full &&
    css`
      width: 100%;
    `}

    ${(props) =>
    props.square &&
    css`
      border-radius: 0;
      width: fit-content;
      padding: 12px 20px;
    `}

    ${(props) =>
    props.right &&
    css`
      margin: 0 0 1rem auto;
    `}
    

  ${(props) =>
    props.danger &&
    css`
      color: #fff;
      background-color: #d82038;
      & a{
        color: #fff !important;
      }
    `}

  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -3px);
  }
  & a{
    color: #000;
    position: relative;
    top: -2px;
  }
`;
