import React from "react";
import Form from "./common/form";
import { StyledCard } from "./styled-components/card";
import { StyledSubHeading } from "./styled-components/heading";
import { register } from "../services/userService";
import { StyledFormContainer } from "./styled-components/styledForm";

const Joi = require("joi-browser");

class RegisterForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
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
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required().label("Email"),
    username: Joi.string().required(),
    password: Joi.string().required().min(5).label("Password"),
    phone: Joi.number().required(),
    userType: Joi.string().required().label("User Type"),
    role: Joi.string().required().label("Role"),
  };

  doSubmit = async () => {
    try {
      await register(this.state.data);
      window.location = "/";
    } catch (ex) {
      console.log(ex.response);
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = "Email already registered"; //ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <StyledCard big>
        <StyledSubHeading>Register</StyledSubHeading>
        <StyledFormContainer oneColumn>
          <div className="login-form">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("firstName", "First Name")}
              {this.renderInput("lastName", "Last Name")}
              {this.renderInput("email", "Email Address", "Email")}
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("phone", "Phone Number", "Number")}
              {this.renderSelect("userType", "User Type", this.state.userType)}
              {this.renderButton("Register")}
            </form>
          </div>
        </StyledFormContainer>
      </StyledCard>
    );
  }
}

export default RegisterForm;
