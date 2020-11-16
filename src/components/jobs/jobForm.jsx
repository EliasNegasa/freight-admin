import React from "react";
import _ from "lodash";
import { getJob, saveJob } from "../../services/jobService";
import Form from "../common/form";
import Spinner from "../common/spinner";
import { StyledSubHeading } from "../styled-components/heading";
import { StyledFormContainer } from "../styled-components/styledForm";
import { saveFile } from "../../services/fileService";
import { getAccounts } from "../../services/accountService";
import { getMachines } from "../../services/machineService";
import Notification from "../common/notification";

const Joi = require("joi-browser");

export class JobForm extends Form {
  state = {
    data: {
      title: "",
      description: "",
      pickUpDate: "",
      dropOffpDate: "",
      pickUpAddress: {},
      dropOffAddress: {},
      weight: "",
      length: "",
      width: "",
      height: "",
      distance: "",
      offRoadDistance: "",
      hasOffroad: "",
      file: "",

      pickUpKebele: "",
      pickUpWoreda: "",
      dropOffKebele: "",
      dropOffWoreda: "",
      pickUpZone: "",
      pickUpCity: "",
      dropOffZone: "",
      dropOffCity: "",

      userId: "",
      machineId: "",
    },
    userSelectOptions: [],
    machineSelectOptions: [],
    errors: {},
    loading: false,
    message: "",
  };

  schema = {
    title: Joi.string().required().label("Job Title"),
    description: Joi.label("Job Description"),
    pickUpDate: Joi.label("Pick up Date"),
    dropOffpDate: Joi.date().label("Drop off Date"),
    weight: Joi.number().label("Weight"),
    length: Joi.number().label("Length"),
    width: Joi.number().label("Width"),
    height: Joi.number().label("Height"),
    distance: Joi.number().label("Distance"),
    offRoadDistance: Joi.number().label("Off Road Distance"),
    hasOffroad: Joi.label("hasOffroad"),

    pickUpKebele: Joi.label("Kebele"),
    pickUpWoreda: Joi.label("Woreda"),
    pickUpZone: Joi.label("Zone"),
    pickUpCity: Joi.label("City"),

    dropOffKebele: Joi.label("Kebele"),
    dropOffWoreda: Joi.label("Woreda"),
    dropOffZone: Joi.label("Zone"),
    dropOffCity: Joi.label("City"),
  };

  populateJob = async () => {
    try {
      const jobId = this.props.match.params.id;
      if (jobId === "new") {
        this.setState({ loading: false });
        return;
      }

      const { data: job } = await getJob(jobId);

      this.setState({ data: this.mapToViewModel(job), loading: false });
    } catch (ex) {
      this.props.history.replace("/not-found");
    }
  };

  async getUserOptions() {
    this.setState({ loading: true });
    const { data } = await getAccounts();
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

    console.log("machine options", options);

    this.setState({ machineSelectOptions: options });
  }

  async componentDidMount() {
    await this.getUserOptions();
    await this.getMachineOptions();
    await this.populateJob();
  }

  mapToViewModel = (job) => {
    return {
      id: job.id,
      title: job.title,
      description: job.description,
      pickUpDate: new Date(job.pickUpDate),
      dropOffpDate: new Date(job.dropOffpDate),
      pickUpAddress: job.pickUpAddress,
      dropOffpAddress: job.dropOffpAddress,
      weight: job.weight,
      length: job.length,
      width: job.width,
      height: job.height,
      quantity: job.quantity,
      distance: job.distance,
      offRoadDistance: job.offRoadDistance,
      hasOffroad: job.hasOffroad,

      pickUpId: job.pickUpAddress.id ? job.pickUpAddress.id : undefined,
      pickUpKebele: job.pickUpAddress.kebele
        ? job.pickUpAddress.kebele
        : undefined,
      pickUpWoreda: job.pickUpAddress.woreda
        ? job.pickUpAddress.woreda
        : undefined,
      pickUpZone: job.pickUpAddress.zone ? job.pickUpAddress.zone : undefined,
      pickUpCity: job.pickUpAddress.city ? job.pickUpAddress.city : undefined,

      dropOffId: job.dropOffAddress.id ? job.dropOffAddress.id : undefined,
      dropOffKebele: job.dropOffAddress.kebele
        ? job.dropOffAddress.kebele
        : undefined,
      dropOffWoreda: job.dropOffAddress.woreda
        ? job.dropOffAddress.woreda
        : undefined,
      dropOffZone: job.dropOffAddress.zone
        ? job.dropOffAddress.zone
        : undefined,
      dropOffCity: job.dropOffAddress.city
        ? job.dropOffAddress.city
        : undefined,

      userId: job.userId ? job.userId : undefined,
      machineId: job.machineId ? job.machineId : undefined,
    };
  };

  doSubmit = async () => {
    const data = { ...this.state.data };

    console.log("Data", data);

    const {
      pickUpId,
      pickUpKebele,
      pickUpWoreda,
      pickUpZone,
      pickUpCity,
    } = data;
    const {
      dropOffId,
      dropOffKebele,
      dropOffWoreda,
      dropOffZone,
      dropOffCity,
    } = data;

    const jobData = _.pick(data, [
      "id",
      "title",
      "description",
      "pickUpDate",
      "dropOffpDate",
      "weight",
      "height",
      "length",
      "quantity",
      "distance",
      "offRoadDistance",
      "userId",
      "machineId",
    ]);

    jobData.pickUpAddress = {
      id: pickUpId,
      kebele: pickUpKebele,
      woreda: pickUpWoreda,
      zone: pickUpZone,
      city: pickUpCity,
    };

    jobData.dropOffAddress = {
      id: dropOffId,
      kebele: dropOffKebele,
      woreda: dropOffWoreda,
      zone: dropOffZone,
      city: dropOffCity,
    };

    console.log("JOB Data", jobData);
    try {
      const { data: job } = await saveJob(jobData);

      const jobId = job.id ? job.id : job.result.id;

      if (data.file) {
        const fileObj = _.pick(data, ["file"]);

        const formData = new FormData();

        formData.append("file", fileObj.file);
        formData.append("id", jobId);

        console.log(await saveFile(formData, "jobs"));
      }

      this.setState({
        message: job.result
          ? "Job data updated Successfully"
          : "Job created Successfully",
        messageType: "success",
        messageTitle: "Success",
      });
      console.log("Saved");
      this.props.history.push("/jobs");
    } catch (ex) {
      if (ex.response && ex.response.status !== 200) {
        const { error } = ex.response.data;
        this.setState({
          message: error.message,
          messageType: "danger",
          messageTitle: "Error",
        });
      }
    }
  };

  render() {
    const { loading, message, messageType, messageTitle } = this.state;
    return (
      <>
        {loading && <Spinner />}
        {!loading && (
          <>
            {message && (
              <Notification
                title={messageTitle}
                message={message}
                type={messageType}
              />
            )}
            <StyledSubHeading left>
              {this.state.data.id ? <span>Edit </span> : <span>Add </span>}Job
            </StyledSubHeading>
            <form onSubmit={this.handleSubmit}>
              {loading && <Spinner />}
              <StyledFormContainer threeColumn>
                <strong>Job Information:</strong>
                {this.renderInput("title", "Job Title")}
                {this.renderInput("description", "Job Description")}
                {this.renderPreloadedSelect(
                  "machineId",
                  "Machine Type",
                  this.state.machineSelectOptions
                )}

                <div className="double-field">
                  {this.renderInput("weight", "Weight (Ton)", "number")}
                  {this.renderInput("width", "Width (m)", "number")}
                </div>
                <div className="double-field">
                  {this.renderInput("length", "Length (m)", "number")}
                  {this.renderInput("height", "Height (m)", "number")}
                </div>
                <div className="double-field">
                  {this.renderInput("distance", "Distance (Km)", "number")}
                  {this.renderInput(
                    "offRoadDistance",
                    "Off-road Distance (Km)",
                    "number"
                  )}
                </div>
                {this.renderPreloadedSelect(
                  "userId",
                  "Job Owner",
                  this.state.userSelectOptions
                )}
                {this.renderFileUpload("file", "Upload Picture")}
              </StyledFormContainer>

              <StyledFormContainer threeColumn>
                <strong>Pick-up Information:</strong>

                {this.renderDatePicker("pickUpDate", "Pick-Up Date")}
                {/* {this.renderInput("pickUpDate", "Pick-Up Date")} */}
                {this.renderInput("pickUpKebele", "Pick-Up Kebele", "number")}
                {this.renderInput("pickUpWoreda", "Pick-Up Woreda", "number")}
                {this.renderInput("pickUpZone", "Pick-Up Subcity/Zone")}
                {this.renderInput("pickUpCity", "Pick-Up City")}
              </StyledFormContainer>

              <StyledFormContainer threeColumn>
                <strong>Drop-up Address:</strong>
                {this.renderDatePicker("dropOffpDate", "Drop-Off Date")}
                {/* {this.renderInput("dropOffpDate", "Drop-Off Date")} */}
                {this.renderInput("dropOffKebele", "Drop-Off Kebele", "number")}
                {this.renderInput("dropOffWoreda", "Drop-Off Woreda", "number")}
                {this.renderInput("dropOffZone", "Drop-Off Subcity/Zone")}
                {this.renderInput("dropOffCity", "Drop-Off City")}
              </StyledFormContainer>

              {this.renderButton("Save")}
            </form>
          </>
        )}
      </>
    );
  }
}

export default JobForm;
