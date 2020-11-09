import React from "react";
import { NavLink } from "react-router-dom";
import { StyledNav } from "./styled-components/containers";
import MapIcon from "@material-ui/icons/Map";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import SpeakerNotesOutlinedIcon from "@material-ui/icons/SpeakerNotesOutlined";
import PermDataSettingOutlinedIcon from "@material-ui/icons/PermDataSettingOutlined";

const NavBar = () => {
  return (
    <ul>
      <StyledNav>
        <NavLink className="nav-link" to="/dashboard">
          <DashboardOutlinedIcon /> Dashboard
        </NavLink>
      </StyledNav>
      <StyledNav>
        <NavLink className="nav-link" to="/accounts">
          <PeopleAltOutlinedIcon /> Accounts
        </NavLink>
      </StyledNav>
      <StyledNav>
        <NavLink className="nav-link" to="/machines">
          <PermDataSettingOutlinedIcon /> Machines
        </NavLink>
      </StyledNav>
      <StyledNav>
        <NavLink className="nav-link" to="/lowbeds">
          <LocalShippingOutlinedIcon /> Lowbeds
        </NavLink>
      </StyledNav>
      <StyledNav>
        <NavLink className="nav-link" to="/jobs">
          <MapIcon /> Jobs
        </NavLink>
      </StyledNav>
      <StyledNav>
        <NavLink className="nav-link" to="/requests">
          <SpeakerNotesOutlinedIcon /> Requests
        </NavLink>
      </StyledNav>
    </ul>
  );
};

export default NavBar;
