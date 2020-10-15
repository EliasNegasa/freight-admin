import styled from "styled-components";

export const StyledTable = styled.table`
  padding: 18px 6px 18px 12px;
  width: 100%;
`;

export const StyledTr = styled.tr`
  border-bottom: 1px solid rgba(113, 110, 182, 0.15);
`;

export const StyledTh = styled.th`
  background-color: ${(props) => props.theme.primary};
  padding: 8px 10px;
`;

export const StyledTd = styled.td`
  padding: 8px 10px;
  word-wrap: break-word;
`;

export const StyledPage = styled.li`
  background-color: white;
  border-radius: 5px;
  font-size: 1.7rem;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  text-align: center;
  list-style: none;
  margin: 0 0.5rem;
`;
