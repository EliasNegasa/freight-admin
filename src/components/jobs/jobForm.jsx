import React from "react";
import _ from "lodash";
import { getJob, saveJob } from "../../services/jobService";
import Form from "../common/form";
import Spinner from "../common/spinner";
import { StyledFormContainer } from "../styled-components/styledForm";
import { saveFile } from "../../services/fileService";
import { filterUsers } from "../../services/userService";
import Notification from "../common/notification";
import BackdropLoader from "../common/Backdrop";
import { getMachineries } from "../../services/machineryService";

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
      distance: "",
      offRoadDistance: "",
      quantity: "",
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
      machineryId: "",
      status: "",
    },
    userSelectOptions: [],
    machinerySelectOptions: [],
    statusOptions: ["open", "closed", "done"],
    errors: {},
    loading: false,
    backdrop: false,
    message: "",
  };

  schema = {
    title: Joi.string().required().label("Job Title"),
    description: Joi.label("Job Description"),
    pickUpDate: Joi.label("Pick up Date"),
    dropOffpDate: Joi.date().label("Drop off Date"),
    quantity: Joi.number().label("Quantity"),
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

    status: Joi.string().required().label("Job Status"),
  };

  populateJob = async () => {
    try {
      const jobId = this.props.id;
      if (jobId === "") {
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
    const { data } = await filterUsers("userType=Machinery Owner");
    const options = data.map((d) => ({
      value: d.id,
      label: `${d.firstName} ${d.lastName}`,
    }));

    this.setState({ userSelectOptions: options });
  }

  async getMachineryOptions() {
    this.setState({ loading: true });
    // const { data } = await filterMachines("isLowbed=false");
    const { data } = await getMachineries();
    const options = data.map((d) => ({
      value: d.id,
      label: d.name,
    }));

    console.log("machinery options", options);

    this.setState({ machinerySelectOptions: options });
  }

  async componentDidMount() {
    await this.getUserOptions();
    await this.getMachineryOptions();
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
      quantity: job.quantity,
      distance: job.distance,
      offRoadDistance: job.offRoadDistance,
      hasOffroad: job.hasOffroad,
      status: job.status,

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
      machineryId: job.machineryId ? job.machineryId : undefined,
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
      "quantity",
      "distance",
      "offRoadDistance",
      "userId",
      "machineryId",
      "status",
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
    this.setState({ backdrop: true });
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
        backdrop: false,
      });
      console.log("Saved");
      this.props.setOpenPopup(false);
      this.props.setId("");
      this.props.onUpdated();

      // this.props.history.push("/jobs");
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
              {loading && <Spinner />}
              <StyledFormContainer threeColumn>
                <strong>Job Information:</strong>
                {this.renderInput("title", "Job Title")}
                {this.renderInput("description", "Job Description")}
                {this.renderPreloadedSelect(
                  "machineryId",
                  "Machine Type",
                  this.state.machinerySelectOptions
                )}

                <div className="double-field">
                  {this.renderInput("distance", "Distance (Km)", "number")}
                  {this.renderInput(
                    "offRoadDistance",
                    "Off-road (Km)",
                    "number"
                  )}
                </div>
                <div className="double-field">
                  {this.renderInput("quantity", "Quantity (m)", "number")}
                  {this.renderSelect(
                    "status",
                    "Status",
                    this.state.statusOptions
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
                <strong>Drop-off Address:</strong>
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
