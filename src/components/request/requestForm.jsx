import React from "react";
import _ from "lodash";
import { filterAccounts } from "../../services/accountService";
import { filterJobs } from "../../services/jobService";
import { getRequest, saveRequest } from "../../services/requestService";
import Form from "../common/form";
import { getLowbed } from "../../services/lowbedService";
import Spinner from "../common/spinner";
import { StyledSubHeading } from "../styled-components/heading";
import { StyledFormContainer } from "../styled-components/styledForm";

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
    statusOptions: ["Open", "Closed", "Pending"],
    errors: {},
    loading: false,
    message: "",
  };

  schema = {
    status: Joi.string().required().label("Request Status"),
  };

  populateRequest = async () => {
    try {
      const requestId = this.props.match.params.id;
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
    const { data } = await filterAccounts("userType=Lowbeds Owner");
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

    try {
      const { data: request } = await saveRequest(data);
      this.setState({
        message: request.result
          ? "Request data updated Successfully"
          : "request created Successfully",
        messageType: "success",
        messageTitle: "Success",
      });
      console.log("Saved");
      this.props.history.push("/requests");
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
            <StyledSubHeading left>
              {this.state.data.id ? <span>Edit </span> : <span>Add </span>}
              Request
            </StyledSubHeading>
            <form onSubmit={this.handleSubmit}>
              {loading && <Spinner />}
              <StyledFormContainer>
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
              </StyledFormContainer>
              {this.renderButton("Save")}
            </form>
          </>
        )}
      </>
    );
  }
}

export default RequestForm;
