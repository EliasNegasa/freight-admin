import { Avatar } from "@material-ui/core";
import React from "react";
import { StyledHeader } from "./styled-components/containers";

const Header = ({ user }) => {
  return (
    <StyledHeader>
      <div className="header-profile">
        <div className="user-name">{user.username}</div>
        <Avatar alt="AD" />
      </div>
    </StyledHeader>
  );
};

export default Header;
