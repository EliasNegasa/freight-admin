import React from "react";
import { getMachine, saveMachine } from "../../services/machineService";
import Form from "../common/form";
import { StyledSubHeading } from "../styled-components/heading";
import { StyledFormContainer } from "../styled-components/styledForm";

const Joi = require("joi-browser");

class MachineForm extends Form {
  state = {
    data: {
      name: "",
      description: "",
      isLowbed: false,
      file: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Machine Name"),
    description: Joi.label("Description"),
    isLowbed: Joi.boolean().label("Machine Type"),
  };

  populateMachine = async () => {
    try {
      const machineId = this.props.match.params.id;
      if (machineId === "new") return;

      const { data: machine } = await getMachine(machineId);

      console.log("MACHINE DATA", machine);
      this.setState({ data: this.mapToViewModel(machine) });
    } catch (ex) {
      this.props.history.replace("/not-found");
    }
  };

  async componentDidMount() {
    await this.populateMachine();
  }

  mapToViewModel = (machine) => {
    return {
      id: machine.id,
      name: machine.name,
      description: machine.description,
      isLowbed: machine.isLowbed,
      file: machine.file,
    };
  };

  mapToFormData = (jsonMachine) => {
    const formData = new FormData();

    Object.keys(jsonMachine).forEach((key) => {
      formData.append(key, jsonMachine[key]);
    });

    return formData;
  };

  doSubmit = async () => {
    const data = this.mapToFormData(this.state.data);
    await saveMachine(data);
    console.log("Saved");
    this.props.history.push("/machines");
  };

  render() {
    return (
      <div>
        <StyledSubHeading left>
          {this.state.data.id ? <span>Edit </span> : <span>Add </span>} Machine
        </StyledSubHeading>
        <form onSubmit={this.handleSubmit}>
          <StyledFormContainer>
            {this.renderInput("name", "Machine Name")}
            {this.renderTextArea("description", "Description")}
            {this.renderCheckBox("isLowbed", "Lowbed")}
            {this.renderFileUpload("file", "Upload Picture")}
            {this.renderButton("Save")}
          </StyledFormContainer>
        </form>
      </div>
    );
  }
}

export default MachineForm;
