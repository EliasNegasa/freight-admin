import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AccountPersonalDetails from "../account/accountPersonalDetails";
import AccountJobDetails from "../account/accountJobDetails";
import AccountRequestDetails from "../account/accountRequestDetails";

const MaterialTabs = () => {
  const [selectedTab, setSelectedtab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedtab(newValue);
  };

  return (
    <>
      <Tabs value={selectedTab} onChange={handleChange}>
        <Tab label="Details" />
        <Tab label="Jobs" />
        <Tab label="Requests" />
      </Tabs>
      {selectedTab === 0 && <AccountPersonalDetails />}
      {selectedTab === 1 && <AccountJobDetails />}
      {selectedTab === 2 && <AccountRequestDetails />}
    </>
  );
};

export default MaterialTabs;
