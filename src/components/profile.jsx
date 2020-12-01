import React from "react";
import AvatarImage from "./common/avatar";

const Profile = ({ user }) => {
  return (
    <div className="header-profile">
      <div className="user-name">{user.username}</div>
      <AvatarImage />
    </div>
  );
};

export default Profile;
