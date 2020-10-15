import React, { Component } from "react";
import { StyledSideBar } from "./styled-components/containers";
import NavBar from "./navbar";

class SideBar extends Component {
  state = {};
  render() {
    return (
      <StyledSideBar>
        <NavBar />
      </StyledSideBar>
    );
  }
}

export default SideBar;
