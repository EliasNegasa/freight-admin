import React from "react";
import _ from "lodash";
import { getUser, saveUser } from "../../services/userService";
import Form from "../common/form";
import { StyledFormContainer } from "../styled-components/styledForm";
import Spinner from "../common/spinner";
import { saveFile } from "../../services/fileService";
import Notification from "../common/notification";
import AvatarImage from "../common/avatar";
import BackdropLoader from "../common/Backdrop";

const Joi = require("joi-browser");

class UserForm extends Form {
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
    userType: ["Machinery Owner", "Lowbed Owner", "Admin"],
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

  populateUser = async () => {
    try {
      // const userId = this.props.match.params.id;
      const userId = this.props.id;
      if (userId === "") return;

      this.setState({ loading: true });
      const { data: user } = await getUser(userId);

      this.setState({ data: this.mapToViewModel(user), loading: false });
    } catch (ex) {
      this.props.history.replace("/not-found");
    }
  };

  async componentDidMount() {
    await this.populateUser();
  }

  mapToViewModel = (user) => {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      phone: user.phone,
      userType: user.userType,
      role: user.role,
      file: user.file,
      addressId: user.address ? user.address.id : undefined,
      kebele: user.address ? user.address.kebele : undefined,
      woreda: user.address ? user.address.woreda : undefined,
      zone: user.address ? user.address.zone : undefined,
      city: user.address ? user.address.city : undefined,
      company: user.address ? user.address.company : "",
      companyPhone: user.address ? user.address.phone : undefined,
      picture: user.picture ? user.picture : undefined,
    };
  };

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
      const { data: user } = await saveUser(userData);
      const userId = user.id ? user.id : user.result.id;

      if (data.file) {
        const fileObj = _.pick(data, ["file"]);

        const formData = new FormData();
        formData.append("file", fileObj.file);
        formData.append("id", userId);

        console.log(await saveFile(formData, "users"));
      }
      this.setState({
        message: user.result
          ? "User data updated Successfully"
          : "User created Successfully",
        messageType: "success",
        messageTitle: "Success",
        backdrop: false,
      });
      console.log("Saved");

      this.props.setOpenPopup(false);
      this.props.setId("");
      this.props.onUpdated();
      // this.props.history.push("/users");
      // this.props.history.push(this.props.location);
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
      data,
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
              <StyledFormContainer>
                <strong>Personal Information:</strong>
                {this.renderInput("firstName", "First Name")}
                {this.renderInput("lastName", "Last Name")}
                {this.renderInput("email", "Email")}
                {this.renderInput("username", "Username")}
                {this.renderInput("phone", "Phone No.")}
                {this.renderSelect(
                  "userType",
                  "User Type",
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

export default UserForm;
