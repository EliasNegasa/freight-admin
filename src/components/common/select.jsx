import React from "react";
import { StyledSelect } from "../styled-components/styledForm";

const Select = ({ name, label, options, errors, ...rest }) => {
  return (
    <div className="form-group">
      {/* <label htmlFor={name}>{label}</label> */}
      <StyledSelect name={name} id={name} {...rest} className="form-control">
        <option value="">User Type</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </StyledSelect>
      {errors && (
        <div className="alert alert-danger" role="alert">
          {errors}
        </div>
      )}
    </div>
  );
};

export default Select;
