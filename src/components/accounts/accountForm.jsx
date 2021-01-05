import React from "react";
import _ from "lodash";
import { getUser, getUsers } from "../../services/userService";
import Form from "../common/form";
import { StyledFormContainer } from "../styled-components/styledForm";
import Spinner from "../common/spinner";
import Notification from "../common/notification";
import BackdropLoader from "../common/Backdrop";

import { getAccount, saveAccount } from "../../services/accountService";

const Joi = require("joi-browser");

class AccountForm extends Form {
  state = {
    data: {
      balance: "",
      userId: "",
    },
    userSelectOptions: [],
    errors: {},
    loading: false,
    backdrop: false,
    message: "",
  };

  schema = {
    balance: Joi.number().required().label("Amount"),
    userId: Joi.number().required().label("User"),
  };

  populateAccount = async () => {
    try {
      // const userId = this.props.match.params.id;
      const accountId = this.props.id;
      if (accountId === "") {
        this.setState({ loading: false });
        return;
      }

      const { data: account } = await getAccount(accountId);

      this.setState({ data: this.mapToViewModel(account), loading: false });
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

  async componentDidMount() {
    await this.getUserOptions();
    await this.populateAccount();
  }

  mapToViewModel = (account) => {
    return {
      id: account.id,
      balance: account.balance,
      userId: account.userId,
    };
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    console.log("Data", data);

    this.setState({ backdrop: true });
    try {
      const { data: account } = await saveAccount(data);

      this.setState({
        message: account.result
          ? "Account updated Successfully"
          : "Account created Successfully",
        messageType: "success",
        messageTitle: "Success",
        backdrop: false,
      });
      console.log("Saved");

      this.props.setOpenPopup(false);
      this.props.setId("");
      this.props.onUpdated();
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
                  {this.renderPreloadedSelect(
                    "userId",
                    "User",
                    this.state.userSelectOptions
                  )}
                  {this.renderInput("balance", "Amount", "number")}
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

export default AccountForm;
