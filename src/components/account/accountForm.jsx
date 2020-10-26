import React from "react";
import _ from "lodash";
import { getAccount, saveAccount } from "../../services/accountService";
import Form from "../common/form";
import { StyledSubHeading } from "../styled-components/heading";
import { StyledFormContainer } from "../styled-components/styledForm";
import Spinner from "../common/spinner";

const Joi = require("joi-browser");

class AccountForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      phone: "",
      role: "Admin",
      file: "",
      kebele: "",
      woreda: "",
      zone: "",
      city: "",
      company: "",
      companyPhone: "",
    },
    userType: ["Machinery Owner", "Lowbeds Owner", "Admin"],
    errors: {},
    loading: false,
  };

  schema = {
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    username: Joi.string().required().label("Username"),
    phone: Joi.number().required().label("Phone"),
    userType: Joi.string().required().label("User Type"),
    role: Joi.string().required().label("Role"),

    kebele: Joi.number().label("Kebele"),
    woreda: Joi.number().label("Woreda"),
    zone: Joi.string().label("Zone"),
    city: Joi.string().label("City"),
    company: Joi.string().label("Company"),
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
      password: account.password,
      email: account.email,
      username: account.username,
      phone: account.phone,
      userType: account.userType,
      role: account.role,
      file: account.file,
      addressId: account.address ? account.address.id : "",
      kebele: account.address ? account.address.kebele : "",
      woreda: account.address ? account.address.woreda : "",
      zone: account.address ? account.address.zone : "",
      city: account.address ? account.address.city : "",
      company: account.address ? account.address.company : "",
      companyPhone: account.address ? account.address.companyPhone : "",
    };
  };

  mapToFormData = (jsonAccount) => {
    const formData = new FormData();

    Object.keys(jsonAccount).forEach((key) => {
      formData.append(key, JSON.stringify(jsonAccount[key]));
    });

    return formData;
  };

  doSubmit = async () => {
    const {
      addressId,
      kebele,
      woreda,
      zone,
      city,
      company,
      companyPhone,
    } = this.state.data;

    const address = {
      addressId,
      kebele,
      woreda,
      zone,
      city,
      company,
      companyPhone,
    };

    const data = { ...this.state.data };

    const pickedData = _.pick(data, [
      "id",
      "firstName",
      "lastName",
      "email",
      "username",
      "password",
      "phone",
      "role",
      "file",
      "userType",
    ]);

    pickedData.address = address;

    console.log("Data", data);
    console.log("pickedData", pickedData);

    const extractedData = this.mapToFormData(pickedData);
    await saveAccount(extractedData);

    console.log("Saved");
    this.props.history.push("/accounts");
  };

  render() {
    return (
      <>
        <StyledSubHeading left>
          {this.state.data.id ? <span>Edit </span> : <span>Add </span>}Account
        </StyledSubHeading>
        <form onSubmit={this.handleSubmit}>
          {this.state.loading && <Spinner />}
          <StyledFormContainer>
            <strong>Personal Information:</strong>
            {this.renderInput("firstName", "First Name")}
            {this.renderInput("lastName", "Last Name")}
            {this.renderInput("email", "Email")}
            {this.renderInput("username", "Username")}
            {this.renderInput("phone", "Phone No.")}
            {this.renderSelect("userType", "Account Type", this.state.userType)}
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
    );
  }
}

export default AccountForm;
