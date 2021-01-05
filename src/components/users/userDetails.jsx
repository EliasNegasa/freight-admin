import React from "react";
import { StyledSubHeading } from "../styled-components/heading";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import UserPersonalDetails from "../users/userPersonalDetails";
import UserJobDetails from "../users/userJobDetails";
import UserRequestDetails from "../users/userRequestDetails";

const UserDetails = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { tabUrl, id } = params;

  const tabNameToIndex = {
    0: "personalTab",
    1: "jobsTab",
    2: "requestTab",
  };

  const indexToTabName = {
    personalTab: 0,
    jobsTab: 1,
    requestTab: 2,
  };

  const [selectedTab, setSelectedtab] = React.useState(indexToTabName[tabUrl]);

  const handleChange = (event, newValue) => {
    history.push(`/users/${id}/details/${tabNameToIndex[newValue]}`);
    setSelectedtab(newValue);
  };

  return (
    <>
      <StyledSubHeading left>User Details</StyledSubHeading>

      <Tabs value={selectedTab} onChange={handleChange}>
        <Tab label="Details" />
        <Tab label="Jobs" />
        <Tab label="Requests" />
      </Tabs>
      {selectedTab === 0 && <UserPersonalDetails id={id} />}
      {selectedTab === 1 && <UserJobDetails id={id} />}
      {selectedTab === 2 && <UserRequestDetails id={id} />}
    </>
  );
};

export default UserDetails;
