import { Button } from "@material-ui/core";
import React from "react";
import { Message } from "../styled-components/styledForm";

const FileUplaod = ({ name, label, errors, ...rest }) => {
  return (
    <div className="field-div">
      <Button variant="contained" color="primary" component="label">
        {label}

        <input
          id={name}
          {...rest}
          name={name}
          type="file"
          style={{ display: "none" }}
        />
        {errors && (
          <Message role="alert">
            <i className="fa fa-exclamation-triangle"></i> {errors}
          </Message>
        )}
      </Button>
    </div>
  );
};

export default FileUplaod;
