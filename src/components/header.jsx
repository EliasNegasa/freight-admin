import { Avatar } from "@material-ui/core";
import React from "react";
import Profile from "./profile";
import { StyledHeader } from "./styled-components/containers";

const Header = ({ user }) => {
  return (
    <StyledHeader>
      <Profile user={user} />
    </StyledHeader>
  );
};

export default Header;
