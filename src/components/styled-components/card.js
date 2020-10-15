import styled from "styled-components";

export const StyledCard = styled.div`
  overflow: hidden;
  padding: 3rem 3rem 5rem;
  margin: 48px auto 0;
  width: ${(props) => (props.big ? "500px" : "300px")};
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  background: #fff;
`;
