import React, { Component } from "react";
import { Link } from "react-router-dom";
import Spinner from "../common/spinner";
import { StyledSubHeading } from "../styled-components/heading";
import { StyledListGroup, StylesList } from "../styled-components/lists";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

class AccountJobDetails extends Component {
  state = { loading: false };

  async componentDidMount() {
    this.setState({ loading: true });
    // const { data: machines } = await getJob();
    // this.setState({ machines, loading: false });
  }

  render() {
    const { loading } = this.state;

    return (
      <>
        <StyledSubHeading left>Jobs Details</StyledSubHeading>
        {loading && <Spinner />}
        <StyledListGroup>
          {/* {machines.map((machine) => (
            <StylesList key={machine.id}>
              <div>
                <div>
                  <div className="name">{machine.name}</div>
                  <div className="description">{machine.description}</div>
                </div>
                <div className="icons-container">
                  <Link to={`/machines/${machine.id}`}>
                    <EditOutlinedIcon style={{ color: "#f9b115" }} />
                  </Link>
                </div>
              </div>
            </StylesList>
          ))} */}
        </StyledListGroup>
      </>
    );
  }
}

export default AccountJobDetails;
