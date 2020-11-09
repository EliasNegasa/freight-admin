import React, { Component } from "react";
import { StyledSubHeading } from "../styled-components/heading";

class LowbedForm extends Component {
  state = {
    data: {},
  };
  render() {
    return (
      <>
        <StyledSubHeading left>
          {this.state.data.id ? <span>Edit </span> : <span>Add </span>}Lowbed
        </StyledSubHeading>
      </>
    );
  }
}

export default LowbedForm;
