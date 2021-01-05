import React, { Component } from "react";
import { Link } from "react-router-dom";
import Spinner from "../common/spinner";
import { StyledSubHeading } from "../styled-components/heading";
import { StyledListGroup, StylesList } from "../styled-components/lists";
import { filterJobs } from "../../services/jobService";
import { formatDate } from "../../utils/formatDate";

class UserJobDetails extends Component {
  state = {
    userJobs: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: userJobs } = await filterJobs(`userId=${this.props.id}`);
    this.setState({ userJobs, loading: false });
  }

  render() {
    const { loading, userJobs } = this.state;

    return (
      <>
        <StyledSubHeading left>Jobs Details</StyledSubHeading>
        {loading && <Spinner />}
        <StyledListGroup>
          {userJobs.map((userJob) => (
            <StylesList key={userJob.id}>
              <div>
                <div>
                  <div className="name">
                    <Link to={`/jobs/${userJob.id}/details`}>
                      {userJob.title}
                    </Link>
                  </div>
                  <div className="description">
                    Pick-up Date: {formatDate(userJob.pickUpDate)}
                  </div>
                  <div className="description">
                    Drop-off Date: {formatDate(userJob.dropOffpDate)}
                  </div>
                </div>
              </div>
            </StylesList>
          ))}
        </StyledListGroup>
      </>
    );
  }
}

export default UserJobDetails;
