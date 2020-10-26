import React from "react";
import { StyledSubHeading } from "../styled-components/heading";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AccountPersonalDetails from "../account/accountPersonalDetails";
import AccountJobDetails from "../account/accountJobDetails";
import AccountRequestDetails from "../account/accountRequestDetails";

const AccountDetails = (props) => {
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
    history.push(`/accounts/${id}/details/${tabNameToIndex[newValue]}`);
    setSelectedtab(newValue);
  };

  return (
    <>
      <StyledSubHeading left>Account Details</StyledSubHeading>

      <Tabs value={selectedTab} onChange={handleChange}>
        <Tab label="Details" />
        <Tab label="Jobs" />
        <Tab label="Requests" />
      </Tabs>
      {selectedTab === 0 && <AccountPersonalDetails id={id} />}
      {selectedTab === 1 && <AccountJobDetails id={id} />}
      {selectedTab === 2 && <AccountRequestDetails id={id} />}
    </>
  );
};

export default AccountDetails;
