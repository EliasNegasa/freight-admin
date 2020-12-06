import React, { Component } from "react";
import { getJob } from "../../services/jobService";
import DetailTable from "../common/detailTable";
import { StyledCard } from "../styled-components/card";
import { StyledFlex } from "../styled-components/containers";
import { StyledSubHeading } from "../styled-components/heading";

class JobDetails extends Component {
  rows = {
    jobRow: [
      { cell: "title", label: "Job Title" },
      { cell: "distance", label: "Distance (km)" },
      { cell: "offRoadDistance", label: "Off-road Distance (km)" },
      { cell: "weight", label: "Load Weight (m)" },
      { cell: "width", label: "Load Width (m)" },
      { cell: "length", label: "Load Length (m)" },
      { cell: "height", label: "Load Height (m)" },
    ],
    pickUpAddressRow: [
      { cell: "dropOffpDate", label: "Drop-off Date" },
      { cell: "pickUpDate", label: "Pickup Date" },
      { cell: "kebele", label: "Pickup kebele" },
      { cell: "pickUpAddress.woreda", label: "Pickup Woreda" },
      { cell: "pickUpAddress.zone", label: "Pickup Zone" },
      { cell: "pickUpAddress.city", label: "Pickup City" },
    ],
  };
  state = { job: {}, loading: false };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: job } = await getJob(this.props.match.params.id);
    this.setState({
      job,
      loading: false,
    });
  }

  render() {
    const { job } = this.state;
    return (
      <>
        <StyledSubHeading left>Job Details</StyledSubHeading>

        <StyledFlex>
          <StyledCard big left smallShadow>
            <div style={{ textAlign: "center" }}>
              <strong>Load Information</strong>
            </div>
            <DetailTable data={job} rows={this.rows.jobRow} />
          </StyledCard>
          <StyledCard big left smallShadow>
            <div style={{ textAlign: "center" }}>
              <strong>Job Information</strong>
            </div>
            <DetailTable data={job} rows={this.rows.pickUpAddressRow} />
          </StyledCard>
        </StyledFlex>
      </>
    );
  }
}

export default JobDetails;
