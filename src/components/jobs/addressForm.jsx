import React from "react";
import _ from "lodash";
import { getJob, saveJob } from "../../services/jobService";
import BackdropLoader from "../common/Backdrop";
import Form from "../common/form";
import Notification from "../common/notification";
import Spinner from "../common/spinner";
import { StyledFormContainer } from "../styled-components/styledForm";

const Joi = require("joi-browser");

class AddressForm extends Form {
  state = {
    data: {
      pickUpLat: "",
      pickUpLong: "",
      dropOffLat: "",
      dropOffLong: "",
    },
    errors: {},
    loading: false,
    backdrop: false,
    message: "",
  };

  schema = {
    pickUpLat: Joi.number().label("Pick-up Latitude"),
    pickUpLong: Joi.number().label("Pick-up Longitude"),
    dropOffLat: Joi.number().label("Drop-off Latitude"),
    dropOffLong: Joi.number().label("Drop-off Longitude"),
  };

  populateAddress = async () => {
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

  async componentDidMount() {
    await this.populateAddress();
  }

  mapToViewModel = (job) => {
    return {
      id: job.id,
      // pickUpId: job.pickUpAddress.id ? job.pickUpAddress.id : undefined,
      // dropOffId: job.dropOffAddress.id ? job.dropOffAddress.id : undefined,
      pickUpLat: job.pickUpAddress.lat ? job.pickUpAddress.lat : undefined,
      pickUpLong: job.pickUpAddress.long ? job.pickUpAddress.long : undefined,
      dropOffLat: job.dropOffAddress.lat ? job.dropOffAddress.lat : undefined,
      dropOffLong: job.dropOffAddress.long
        ? job.dropOffAddress.long
        : undefined,
    };
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    console.log("Data", data);

    const { pickUpLat, pickUpLong, dropOffLat, dropOffLong } = data;

    const jobData = _.pick(data, ["id"]);

    jobData.pickUpAddress = {
      lat: pickUpLat,
      long: pickUpLong,
    };

    jobData.dropOffAddress = {
      lat: dropOffLat,
      long: dropOffLong,
    };

    this.setState({ backdrop: true });

    try {
      const { data: job } = await saveJob(jobData);

      this.setState({
        message: "Job Address updated Successfully",
        messageType: "success",
        messageTitle: "Success",
        backdrop: false,
      });
      console.log("Saved");

      this.props.setOpenPopup(false)
      this.props.setId("");

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
            {message && (
              <Notification
                title={messageTitle}
                message={message}
                type={messageType}
              />
            )}

            <StyledFormContainer oneColumn>
              <div className="login-form">
                <form onSubmit={this.handleSubmit}>
                  <strong>Pick-up Address:</strong>
                  {this.renderInput("pickUpLat", "Pick-Up Latitude", "number")}
                  {this.renderInput(
                    "pickUpLong",
                    "Pick-Up Longitude",
                    "number"
                  )}
                  <strong>Drop-off Address:</strong>
                  {this.renderInput(
                    "dropOffLat",
                    "Drop-off Latitude",
                    "number"
                  )}
                  {this.renderInput(
                    "dropOffLong",
                    "Drop-off Longitude",
                    "number"
                  )}
                  {this.renderButton("Save")}
                </form>
              </div>
            </StyledFormContainer>
          </>
        )}
      </>
    );
  }
}

export default AddressForm;
