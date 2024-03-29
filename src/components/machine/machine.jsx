import React, { Component } from "react";
import { getMachines } from "../../services/machineService";
import Spinner from "../common/spinner";
import { StyledSubHeading } from "../styled-components/heading";
import MachineList from "./machineList";

class Machine extends Component {
  state = {
    machines: [],
    loading: false,
    isUpdated: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: machines } = await getMachines();
    this.setState({ machines, loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.isUpdated !== this.state.isUpdated) {
      // this.setState({ loading: true });
      const { data: machines } = await getMachines();
      this.setState({ machines, isUpdated: false });
    }
  }

  handleIsUpdated = () => {
    this.setState({ isUpdated: true });
  };

  render() {
    const { machines, loading } = this.state;

    return (
      <>
        <StyledSubHeading left>Machine List</StyledSubHeading>
        {loading && <Spinner />}
        <MachineList machines={machines} onUpdated={this.handleIsUpdated} />
      </>
    );
  }
}

export default Machine;
