import React from "react";
import { StyledInput, Message } from "../styled-components/styledForm";

const Input = ({ name, label, errors, ...rest }) => {
  return (
    <div className="field-div">
      <StyledInput id={name} {...rest} name={name} placeholder={`${label}`} />
      {/* {console.log("ERRORS: ", errors.message)} */}
      {errors && (
        <Message role="alert">
          <i className="fas fa-exclamation-triangle"></i> {errors}
        </Message>
      )}
    </div>
  );
};

export default Input;
