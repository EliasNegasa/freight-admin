import React, { Component } from "react";
import { StyledSubHeading } from "../styled-components/heading";

class LowbedForm extends Component {
  state = {};
  render() {
    return (
      <>
        <StyledSubHeading left>
          {this.state.data.id ? <span>Edit </span> : <span>Add </span>}Job
        </StyledSubHeading>
      </>
    );
  }
}

export default LowbedForm;
