import React from "react";
import Form from "./common/form";
import { StyledCard } from "./styled-components/card";
import { StyledSubHeading } from "./styled-components/heading";
import { register } from "../services/userService";
// import auth from "../services/authService";

const Joi = require("joi-browser");

class RegisterForm extends Form {
  state = {
    data: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      username: "",
      phone: "",
      role: "Admin",
    },
    userType: ["Machinery Owner", "Lowbeds Owner", "Admin"],
    errors: {},
  };

  schema = {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required().label("Email"),
    username: Joi.string().required(),
    password: Joi.string().required().min(5).label("Password"),
    phone: Joi.number().required(),
    userType: Joi.string().required().label("User Type"),
    role: Joi.string().required().label("Role"),
  };

  doSubmit = async () => {
    try {
      console.log("DATA", this.state.data);
      const data = await register(this.state.data);
      // auth.loginWithJwt(headers["Authorization"]);

      // window.location = "/";
    } catch (ex) {
      console.log(ex.response)
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = "email already registered"; //ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <StyledCard big>
        <StyledSubHeading>Register</StyledSubHeading>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("firstname", "First Name")}
          {this.renderInput("lastname", "Last Name")}
          {this.renderInput("email", "Email Address", "Email")}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("phone", "Phone Number", "Number")}
          {this.renderSelect("userType", "User Type", this.state.userType)}
          {this.renderButton("Register")}
        </form>
      </StyledCard>
    );
  }
}

export default RegisterForm;
