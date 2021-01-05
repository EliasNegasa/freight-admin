import React from "react";
import { getUsers } from "../../services/userService";
import { saveFile } from "../../services/fileService";
import { getLowbed, saveLowbed } from "../../services/lowbedService";
import Form from "../common/form";
import _ from "lodash";
import Spinner from "../common/spinner";
import { StyledFormContainer } from "../styled-components/styledForm";
import { getMachines } from "../../services/machineService";
import Notification from "../common/notification";
import BackdropLoader from "../common/Backdrop";

const Joi = require("joi-browser");

class LowbedForm extends Form {
  state = {
    data: {
      name: "",
      licensePlate: "",
      madeIn: "",
      manufacturingYear: "",
      motorNo: "",
      chassieNo: "",
      modelNo: "",
      serialNo: "",
      width: "",
      height: "",
      length: "",
      tyreNo: "",
      loadingCapacity: "",
      horsePower: "",
      file: "",

      userId: "",
      machineId: "",
    },
    userSelectOptions: [],
    machineSelectOptions: [],
    errors: {},
    loading: false,
    backdrop: false,
    message: "",
  };

  schema = {
    name: Joi.string().required().label("Name"),
    licensePlate: Joi.string().required().label("License Plate"),
    madeIn: Joi.string().required().label("Made In"),
    manufacturingYear: Joi.number().required().label("Manufacturing Year"),
    motorNo: Joi.string().required().label("Motor Number"),
    chassieNo: Joi.string().label("Chassie Number"),
    modelNo: Joi.string().required().label("Model Number"),
    serialNo: Joi.string().required().label("Serial Number"),
    width: Joi.number().label("Width"),
    height: Joi.number().label("Height"),
    length: Joi.number().label("Length"),
    tyreNo: Joi.number().required().label("Tyre Number"),
    loadingCapacity: Joi.number().label("Loading Capacity"),
    horsePower: Joi.number().required().label("Horse Power"),
  };

  populateLowbed = async () => {
    try {
      const lowbedId = this.props.id;
      if (lowbedId === "") {
        this.setState({ loading: false });
        return;
      }

      const { data: lowbed } = await getLowbed(lowbedId);
      console.log("RESPONSE", lowbed);
      this.setState({ data: this.mapToViewModel(lowbed), loading: false });
    } catch (ex) {
      this.props.history.replace("/not-found");
    }
  };

  async getUserOptions() {
    this.setState({ loading: true });
    const { data } = await getUsers();
    const options = data.map((d) => ({
      value: d.id,
      label: `${d.firstName} ${d.lastName}`,
    }));

    this.setState({ userSelectOptions: options });
  }

  async getMachineOptions() {
    this.setState({ loading: true });
    const { data } = await getMachines();
    const options = data.map((d) => ({
      value: d.id,
      label: d.name,
    }));

    this.setState({ machineSelectOptions: options });
  }

  async componentDidMount() {
    await this.getUserOptions();
    await this.getMachineOptions();
    await this.populateLowbed();
  }

  mapToViewModel = (lowbed) => {
    return {
      id: lowbed.id,
      name: lowbed.name,
      licensePlate: lowbed.licensePlate,
      madeIn: lowbed.madeIn,
      manufacturingYear: lowbed.manufacturingYear,
      motorNo: lowbed.motorNo,
      chassieNo: lowbed.chassieNo,
      modelNo: lowbed.modelNo,
      serialNo: lowbed.serialNo,
      length: lowbed.length,
      width: lowbed.width,
      height: lowbed.height,
      tyreNo: lowbed.tyreNo,
      loadingCapacity: lowbed.loadingCapacity,
      horsePower: lowbed.horsePower,

      userId: lowbed.userId ? lowbed.userId : undefined,
      machineId: lowbed.machineId ? lowbed.machineId : undefined,
    };
  };

  doSubmit = async () => {
    const data = { ...this.state.data };

    console.log("Data", data);

    const lowbedData = _.pick(data, [
      "id",
      "name",
      "licensePlate",
      "madeIn",
      "manufacturingYear",
      "motorNo",
      "chassieNo",
      "modelNo",
      "serialNo",
      "width",
      "height",
      "length",
      "tyreNo",
      "loadingCapacity",
      "horsePower",
      "userId",
      "machineId",
    ]);

    console.log("Lowbed Data", lowbedData);
    this.setState({ backdrop: true });
    try {
      const { data: lowbed } = await saveLowbed(lowbedData);

      const lowbedId = lowbed.id ? lowbed.id : lowbed.result.id;

      if (data.file) {
        const fileObj = _.pick(data, ["file"]);

        const formData = new FormData();
        formData.append("file", fileObj.file);
        formData.append("id", lowbedId);

        console.log(await saveFile(formData, "jobs"));
      }
      this.setState({
        message: lowbed.result
          ? "Lowbed data updated Successfully"
          : "Lowbed created Successfully",
        messageType: "success",
        messageTitle: "Success",
        backdrop: false,
      });

      console.log("Saved");
      this.props.setOpenPopup(false);
      this.props.setId("");
      this.props.onUpdated();

      // this.props.history.push("/lowbeds");
    } catch (ex) {
      if (ex.response && ex.response.status !== 200) {
        const error = ex.response.data;
        this.setState({
          message: error.message,
          messageType: "danger",
          messageTitle: "Error",
          backdrop: false,
        });
      }
    }
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

            <form onSubmit={this.handleSubmit}>
              {this.state.loading && <Spinner />}
              <StyledFormContainer>
                <strong>Machine Information:</strong>
                {this.renderInput("name", "Name")}
                {this.renderInput("licensePlate", "License Plate")}
                {this.renderInput("madeIn", "Made in")}
                {this.renderInput("manufacturingYear", "Manufacturing Year")}
                {this.renderInput("motorNo", "Motor Number")}
                {this.renderInput("chassieNo", "Chassie Number")}
                {this.renderInput("modelNo", "Model Number")}
                {this.renderInput("serialNo", "Serial Number")}
              </StyledFormContainer>
              <StyledFormContainer>
                <br />
                {this.renderPreloadedSelect(
                  "machineId",
                  "Type",
                  this.state.machineSelectOptions
                )}
                {this.renderInput(
                  "loadingCapacity",
                  "Loading Capacity",
                  "number"
                )}
                {this.renderInput("horsePower", "Horse Power", "number")}
                <div className="double-field">
                  {this.renderInput("width", "Width (m)", "number")}
                  {this.renderInput("height", "Height (m)", "number")}
                </div>
                <div className="double-field">
                  {this.renderInput("length", "Length (m)", "number")}
                  {this.renderInput("tyreNo", "No. of Tyre", "number")}
                </div>
                {this.renderPreloadedSelect(
                  "userId",
                  "Lowbed Owner",
                  this.state.userSelectOptions
                )}
                {this.renderFileUpload("file", "Upload Picture")}
              </StyledFormContainer>
              {this.renderButton("Save")}
            </form>
          </>
        )}
      </>
    );
  }
}

export default LowbedForm;
