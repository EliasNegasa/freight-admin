import React from "react";
import { StyledCard } from "./styled-components/card";
import { StyledSubHeading } from "./styled-components/heading";
import { Message } from "./styled-components/styledForm";
import auth from "../services/authService";
import Form from "./common/form";

const Joi = require("joi-browser");

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        console.log("CATCH", ex.response.data);
        errors.username = "Invalid Username or Password";
        this.setState({ errors });
      }
    }
  };

  confirm = () => {
    if (window.location.pathname === "/login/confirmed") {
      return (
        <Message success role="alert">
          Your account is Activated! Please log in.
        </Message>
      );
    }
  };

  render() {
    return (
      <StyledCard big>
        <StyledSubHeading>Login</StyledSubHeading>
        {this.confirm()}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </StyledCard>
    );
  }
}

export default LoginForm;
