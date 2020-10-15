import React from "react";
import { NavLink } from "react-router-dom";
import { StyledNav } from "./styled-components/containers";

const NavBar = () => {
  return (
    <ul>
      <StyledNav>
        <NavLink className="nav-link" to="/accounts">
          Accounts
        </NavLink>
      </StyledNav>
      <StyledNav>
        <NavLink className="nav-link" to="/customers">
          Jobs
        </NavLink>
      </StyledNav>
      <StyledNav>
        <NavLink className="nav-link" to="/rentals">
          Requests
        </NavLink>
      </StyledNav>
    </ul>
  );
};

export default NavBar;
