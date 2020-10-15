import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledContent = styled.div`
  width: 87%;
  margin: 0 auto;
  min-height: calc(100vh - 60px);
  padding: 2rem;
`;

export const StyledSideBar = styled.div`
  z-index: 200;
  height: 100vh;
  width: 13%;
  max-width: 240px;
  min-width: 220px;
  margin-top: 60px;
  left: 0;
  background: ${(props) => props.theme.secondary};
  -webkit-box-shadow: 2px 0px 3px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 2px 0px 3px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 2px 0px 3px 0px rgba(0, 0, 0, 0.3);
`;

export const StyledHeader = styled.div`
  width: 100%;
  height: 60px;
  background: ${(props) => props.theme.secondary};
  -webkit-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
  position: absolute;
  z-index: 999;
`;

export const StyledNav = styled.li`
  padding: 16px 0;
  padding-left: 20px;
  list-style: none;
  border-bottom: 0.5px solid #111;
`;
