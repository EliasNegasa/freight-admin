import React from "react";
import _ from "lodash";
import { filterUsers } from "../../services/userService";
import { filterJobs } from "../../services/jobService";
import { getRequest, saveRequest } from "../../services/requestService";
import Form from "../common/form";
import { getLowbed } from "../../services/lowbedService";
import Spinner from "../common/spinner";
import { StyledFormContainer } from "../styled-components/styledForm";
import BackdropLoader from "../common/Backdrop";
import Notification from "../common/notification";
import AsynchronousSelect from "../common/autoComplete";

const Joi = require("joi-browser");

class RequestForm extends Form {
  state = {
    data: {
      userId: "",
      jobId: "",
      lowbedId: "",
      status: "",
    },
    userSelectOptions: [],
    jobSelectOptions: [],
    lowbedSelectOptions: [],
    statusOptions: ["accepted", "pending", "cancelled"],
    errors: {},
    loading: false,
    backdrop: false,
    message: "",
  };

  schema = {
    status: Joi.string().required().label("Request Status"),
  };

  populateRequest = async () => {
    try {
      const requestId = this.props.id;
      if (requestId === "new") {
        this.setState({ loading: false });
        return;
      }

      const { data: request } = await getRequest(requestId);

      this.setState({ data: this.mapToViewModel(request), loading: false });
    } catch (ex) {
      this.props.history.replace("/not-found");
    }
  };

  async getUserOptions() {
    this.setState({ loading: true });
    const { data } = await filterUsers("userType=Lowbed Owner");
    const options = data.map((d) => ({
      value: d.id,
      label: `${d.firstName} ${d.lastName}`,
    }));

    this.setState({ userSelectOptions: options });
  }

  async getJobOptions() {
    this.setState({ loading: true });
    const { data } = await filterJobs("status=open");
    const options = data.map((d) => ({
      value: d.id,
      label: `${d.title}`,
    }));

    this.setState({ jobSelectOptions: options });
  }

  async getLowbedOptions() {
    this.setState({ loading: true });
    const { data } = await getLowbed();
    const options = data.map((d) => ({
      value: d.id,
      label: `${d.licensePlate}`,
    }));

    this.setState({ lowbedSelectOptions: options });
  }

  async componentDidMount() {
    await this.getUserOptions();
    await this.getJobOptions();
    await this.getLowbedOptions();
    await this.populateRequest();
  }

  mapToViewModel = (request) => {
    return {
      id: request.id,
      status: request.status,
      userId: request.userId ? request.userId : undefined,
      jobId: request.jobId ? request.jobId : undefined,
      lowbedId: request.lowbedId ? request.lowbedId : undefined,
    };
  };

  doSubmit = async () => {
    const data = { ...this.state.data };

    console.log("Data", data);

    this.setState({ backdrop: true });
    try {
      const { data: request } = await saveRequest(data);
      this.setState({
        message: request.result
          ? "Request data updated Successfully"
          : "request created Successfully",
        messageType: "success",
        messageTitle: "Success",
        backdrop: false,
      });
      console.log("Saved");
      this.props.setOpenPopup(false);
      this.props.setId("");
      this.props.onUpdated();
      // this.props.history.push("/requests");
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
            <StyledFormContainer oneColumn>
              <div className="login-form">
                <form onSubmit={this.handleSubmit}>
                  {loading && <Spinner />}
                  {this.renderPreloadedSelect(
                    "userId",
                    "Requester",
                    this.state.userSelectOptions
                  )}
                  {this.renderPreloadedSelect(
                    "jobId",
                    "Job",
                    this.state.jobSelectOptions
                  )}
                  {this.renderPreloadedSelect(
                    "lowbedId",
                    "Lowbed",
                    this.state.lowbedSelectOptions
                  )}
                  {this.renderSelect(
                    "status",
                    "Status",
                    this.state.statusOptions
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

export default RequestForm;
