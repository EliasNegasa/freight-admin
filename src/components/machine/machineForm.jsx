import React from "react";
import { getMachine, saveMachine } from "../../services/machineService";
import BackdropLoader from "../common/Backdrop";
import Form from "../common/form";
import Notification from "../common/notification";
import Spinner from "../common/spinner";
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
    loading: false,
    backdrop: false,
    message: "",
  };

  schema = {
    name: Joi.string().required().label("Machine Name"),
    description: Joi.label("Description"),
    isLowbed: Joi.boolean().label("Machine Type"),
  };

  populateMachine = async () => {
    try {
      const machineId = this.props.id;
      if (machineId === "") return;

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
    this.props.setOpenPopup(false);
    this.props.setId("");
    this.props.onUpdated();
    // this.props.history.push("/machines");
  };

  render() {
    const {
      backdrop,
      loading,
      message,
      messageType,
      messageTitle,
    } = this.state;
    return (
      <>
        {backdrop && <BackdropLoader />}
        {loading && <Spinner />}
        {!loading && (
          <>
            {message && this.props.openPopup && (
              <Notification
                title={messageTitle}
                message={message}
                type={messageType}
              />
            )}
            <StyledFormContainer oneColumn>
              <div className="login-form">
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("name", "Machine Name")}
                  {this.renderTextArea("description", "Description")}
                  {this.renderCheckBox("isLowbed", "Lowbed")}
                  {this.renderFileUpload("file", "Upload Picture")}
                  <div style={{ margin: "3px 30px 15px auto" }}>
                    {this.renderButton("Save")}
                  </div>
                </form>
              </div>
            </StyledFormContainer>
          </>
        )}
      </>
    );
  }
}

export default MachineForm;
