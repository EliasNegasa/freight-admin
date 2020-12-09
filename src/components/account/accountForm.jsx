import React from "react";
import _ from "lodash";
import { getAccount, saveAccount } from "../../services/accountService";
import Form from "../common/form";
import { StyledSubHeading } from "../styled-components/heading";
import { StyledFormContainer } from "../styled-components/styledForm";
import Spinner from "../common/spinner";
import { saveFile } from "../../services/fileService";
import Notification from "../common/notification";
import AvatarImage from "../common/avatar";
import BackdropLoader from "../common/Backdrop";

const Joi = require("joi-browser");

class AccountForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      // password: "",
      address: {},
      phone: "",
      role: "Admin",
      file: "",
      kebele: "",
      woreda: "",
      zone: "",
      city: "",
      company: "",
      companyPhone: "",
      picture: "",
    },
    userType: ["Machinery Owner", "Lowbeds Owner", "Admin"],
    errors: {},
    loading: false,
    backdrop: false,
    message: "",
  };

  schema = {
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    username: Joi.string().required().label("Username"),
    phone: Joi.number().required().label("Phone"),
    userType: Joi.string().required().label("User Type"),
    role: Joi.string().required().label("Role"),

    kebele: Joi.label("Kebele"),
    woreda: Joi.label("Woreda"),
    zone: Joi.label("Zone"),
    city: Joi.label("City"),
    company: Joi.label("Company"),
    companyPhone: Joi.number().label("Company Phone"),
  };

  populateAccount = async () => {
    try {
      const accountId = this.props.match.params.id;
      if (accountId === "new") return;

      this.setState({ loading: true });
      const { data: account } = await getAccount(accountId);

      this.setState({ data: this.mapToViewModel(account), loading: false });
    } catch (ex) {
      this.props.history.replace("/not-found");
    }
  };

  async componentDidMount() {
    await this.populateAccount();
  }

  mapToViewModel = (account) => {
    return {
      id: account.id,
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      username: account.username,
      phone: account.phone,
      userType: account.userType,
      role: account.role,
      file: account.file,
      addressId: account.address ? account.address.id : undefined,
      kebele: account.address ? account.address.kebele : undefined,
      woreda: account.address ? account.address.woreda : undefined,
      zone: account.address ? account.address.zone : undefined,
      city: account.address ? account.address.city : undefined,
      company: account.address ? account.address.company : "",
      companyPhone: account.address ? account.address.phone : undefined,
      picture: account.picture ? account.picture : undefined,
    };
  };

  // appendToFormData = (jsonAccount) => {
  //   const formData = new FormData();

  //   Object.keys(jsonAccount).forEach((key) => {
  //     formData.append(key, jsonAccount[key]);
  //   });

  //   return formData;
  // };

  doSubmit = async () => {
    const data = { ...this.state.data };

    console.log("Data", data);

    const {
      addressId,
      kebele,
      woreda,
      zone,
      city,
      company,
      companyPhone,
    } = data;

    const userData = _.pick(data, [
      "id",
      "firstName",
      "lastName",
      "email",
      "username",
      "phone",
      "role",
      "userType",
    ]);

    userData.address = {
      addressId,
      kebele,
      woreda,
      zone,
      city,
      company,
      phone: companyPhone,
    };
    this.setState({ backdrop: true });
    try {
      const { data: account } = await saveAccount(userData);
      const userId = account.id ? account.id : account.result.id;

      if (data.file) {
        const fileObj = _.pick(data, ["file"]);

        const formData = new FormData();
        formData.append("file", fileObj.file);
        formData.append("id", userId);

        console.log(await saveFile(formData, "users"));
      }
      this.setState({
        message: account.result
          ? "User data updated Successfully"
          : "User created Successfully",
        messageType: "success",
        messageTitle: "Success",
        backdrop: false,
      });
      console.log("Saved");
      this.props.history.push("/accounts");
    } catch (ex) {
      if (ex.response && ex.response.status !== 200) {
        const { error } = ex.response.data;
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
      data,
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
            <StyledSubHeading left>
              {this.state.data.id ? <span>Edit </span> : <span>Add </span>}
              Account
            </StyledSubHeading>
            <form onSubmit={this.handleSubmit}>
              <StyledFormContainer>
                <strong>Personal Information:</strong>
                {this.renderInput("firstName", "First Name")}
                {this.renderInput("lastName", "Last Name")}
                {this.renderInput("email", "Email")}
                {this.renderInput("username", "Username")}
                {this.renderInput("phone", "Phone No.")}
                {this.renderSelect(
                  "userType",
                  "Account Type",
                  this.state.userType
                )}
                {data.picture && (
                  <AvatarImage
                    alt={data.firstName}
                    src={data.picture.filePath}
                    styleClass="large"
                  />
                )}
                {this.renderFileUpload("file", "Upload Picture")}
                {/* is Admin checkbox */}
              </StyledFormContainer>

              <StyledFormContainer>
                <strong>Address:</strong>
                {this.renderInput("kebele", "Kebele", "number")}
                {this.renderInput("woreda", "Woreda", "number")}
                {this.renderInput("zone", "Subcity/Zone")}
                {this.renderInput("city", "City")}
                {this.renderInput("company", "Company")}
                {this.renderInput("companyPhone", "Company Phone")}
              </StyledFormContainer>
              {this.renderButton("Save")}
            </form>
          </>
        )}
      </>
    );
  }
}

export default AccountForm;
