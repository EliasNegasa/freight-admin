import React, { Component } from "react";
import { StyledChart, StyledFlex } from "./styled-components/containers";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import SpeakerNotesOutlinedIcon from "@material-ui/icons/SpeakerNotesOutlined";
import MapIcon from "@material-ui/icons/Map";
import DashboardBox from "./dashboardBox";
import LineChart from "./chart/lineChart";
import BarChart from "./chart/barChart";
import { filterAccounts } from "../services/accountService";
import { getJobs } from "../services/jobService";
import { getLowbeds } from "../services/lowbedService";

class Home extends Component {
  state = {
    numberOfAccounts: "",
    numberOfJobs: "",
    numberOflowbeds: "",
  };

  async componentDidMount() {
    const { data: accounts } = await filterAccounts("deleted=false");
    const { data: jobs } = await getJobs();
    const { data: lowbeds } = await getLowbeds();
    this.setState({
      numberOfAccounts: accounts.length,
      numberOfJobs: jobs.length,
      numberOflowbeds: lowbeds.length,
    });
  }

  render() {
    const data = this.state;
    return (
      <>
        <StyledFlex>
          <DashboardBox
            yellow
            label="Customers"
            value={data.numberOfAccounts}
            icon={<PeopleAltOutlinedIcon />}
          />
          <DashboardBox
            black
            label="Jobs"
            value={data.numberOfJobs}
            icon={<MapIcon />}
          />
          <DashboardBox
            yellow
            label="Registered Lowbeds"
            value={data.numberOflowbeds}
            icon={<LocalShippingOutlinedIcon />}
          />
          <DashboardBox
            black
            label="Requestss"
            value="0"
            icon={<SpeakerNotesOutlinedIcon />}
          />
        </StyledFlex>
        <StyledFlex>
          <StyledChart>
            <LineChart />
          </StyledChart>
          <StyledChart>
            <BarChart />
          </StyledChart>
        </StyledFlex>
      </>
    );
  }
}

export default Home;
