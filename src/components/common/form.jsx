import React, { Component } from "react";
import Input from "./input";
import { StyledButton } from "../styled-components/button";
import TextArea from "./textArea";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import FileUplaod from "./fileUpload";
import SelectInput from "./select";
import PreloadedSelect from "./preloadedSelect";

const Joi = require("joi-browser");

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const { data } = this.state;
    const { error } = Joi.validate(data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const fieldschema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, fieldschema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    console.log("SAVE CLICKED");
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return console.log("ERROR OCCURED", errors);
    this.doSubmit();
  };

  handleFileChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.files[0];
    console.log("FILE", data[input.name]);
    this.setState({ data });
  };

  handleChange = ({ currentTarget: input }) => {
    //e.currentTarget
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.type === "checkbox" ? input.checked : input.value;
    this.setState({ data, errors });
  };

  handlePreloadedSelectChange(e) {
    const data = { ...this.state.data };
    data["userId"] = e.value;
    this.setState({ data });
  }

  renderButton = (label) => {
    return (
      // disabled={this.validate()}
      <StyledButton square right>
        {label}
      </StyledButton>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        value={data[name]}
        onChange={this.handleChange}
        type={type}
        name={name}
        label={label}
        errors={errors[name]}
      />
    );
  };

  renderCheckBox = (name, label) => {
    const { data, errors } = this.state;
    return (
      <FormControlLabel
        control={
          <Checkbox
            onChange={this.handleChange}
            name={name}
            color="primary"
            checked={data[name]}
            errors={errors[name]}
          />
        }
        label="Lowbed"
      />
    );
  };

  renderTextArea = (name, label) => {
    const { data, errors } = this.state;
    return (
      <TextArea
        value={data[name]}
        onChange={this.handleChange}
        name={name}
        label={label}
        errors={errors[name]}
      ></TextArea>
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <SelectInput
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        errors={errors[name]}
      />
    );
  };

  renderPreloadedSelect = (name, label, options) => {
    const { data } = this.state;
    return (
      <PreloadedSelect
        options={options}
        placeholder={label}
        onChange={(e) => this.handlePreloadedSelectChange(e)}
        setValue={data[name] ? data[name] : ""}
      />
    );
  };

  renderFileUpload = (name, label) => {
    const { errors } = this.state;
    return (
      <FileUplaod
        name={name}
        label={label}
        onChange={this.handleFileChange}
        errors={errors[name]}
      />
    );
  };
}

export default Form;
