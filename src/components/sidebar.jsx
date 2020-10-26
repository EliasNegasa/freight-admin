import React, { Component } from "react";
import { StyledLogo, StyledSideBar } from "./styled-components/containers";
import NavBar from "./navbar";
import logo from "../logo.JPG";

class SideBar extends Component {
  state = {};
  render() {
    return (
      <StyledSideBar>
        <StyledLogo>
          <img src={logo} alt="logo" />
        </StyledLogo>
        <NavBar />
      </StyledSideBar>
    );
  }
}

export default SideBar;
