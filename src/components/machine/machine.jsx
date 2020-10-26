import React, { Component } from "react";
import { Link } from "react-router-dom";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { getMachines } from "../../services/machineService";
import Spinner from "../common/spinner";
import { StyledButton } from "../styled-components/button";
import { StyledSubHeading } from "../styled-components/heading";
import { StyledListGroup, StylesList } from "../styled-components/lists";

class Machine extends Component {
  state = {
    machines: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: machines } = await getMachines();
    this.setState({ machines, loading: false });
  }

  render() {
    const { machines, loading } = this.state;

    return (
      <>
        <StyledSubHeading left>Machine List</StyledSubHeading>
        <StyledButton square right>
          <Link to="/machines/new">Add Machine</Link>
        </StyledButton>
        {loading && <Spinner />}
        <StyledListGroup>
          {machines.map((machine) => (
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
          ))}
        </StyledListGroup>
      </>
    );
  }
}

export default Machine;
