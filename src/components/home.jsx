import React, { Component } from "react";
import { StyledFlex } from "./styled-components/containers";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import SpeakerNotesOutlinedIcon from "@material-ui/icons/SpeakerNotesOutlined";
import MapIcon from "@material-ui/icons/Map";
import DashboardBox from "./dashboardBox";

class Home extends Component {
  state = {};
  render() {
    return (
      <>
        <StyledFlex>
          <DashboardBox
            yellow
            label="Customers"
            value="200"
            icon={<PeopleAltOutlinedIcon />}
          />
          <DashboardBox black label="Jobs" value="50" icon={<MapIcon />} />
          <DashboardBox
            yellow
            label="Registered Lowbeds"
            value="42"
            icon={<LocalShippingOutlinedIcon />}
          />
          <DashboardBox
            black
            label="Requestss"
            value="85"
            icon={<SpeakerNotesOutlinedIcon />}
          />
        </StyledFlex>
      </>
    );
  }
}

export default Home;
