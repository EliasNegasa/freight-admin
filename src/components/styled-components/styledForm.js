import styled, { css } from "styled-components";

export const StyledInput = styled.input`
  padding: 10px 6px;
  margin: 1rem 0;
  background: #f9f9f9;
  font-family: inherit;
  font-size: 14px;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #ddd;
  border-left: 0;
  transition: border-bottom-color 0.25s ease-in;
  width: 100%;

  ${(props) =>
    props.half &&
    css`
      width: 50%;
    `}

  &:focus {
    border-bottom-color: ${(props) => props.theme.primary};
    outline: 0;
  }
`;

export const StyledSelect = styled.select`
  padding: 10px 0;
  margin: 1rem 0;
  background: #f9f9f9;
  width: 100%;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #ddd;
  border-left: 0;
  transition: border-bottom-color 0.25s ease-in;

  &:focus {
    border-bottom-color: ${(props) => props.theme.primary};
    outline: 0;
  }
`;

export const Message = styled.span`
  width: 100%;
  display: block;
  padding: 3px 10px;
  top: 0;
  z-index: 9999;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -moz-box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), inset 0px 0px 3px white;
  -webkit-box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), inset 0px 0px 3px white;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), inset 0px 0px 3px white;

  color: #aa2323;
  background-color: #f6d6d6;

  ${(props) =>
    props.success &&
    css`
      color: #270;
      background-color: #dff2bf;
    `}
`;
