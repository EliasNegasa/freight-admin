import React from "react";
import { StyledCard } from "./styled-components/card";
import { StyledSubHeading } from "./styled-components/heading";
import { Message, StyledFormContainer } from "./styled-components/styledForm";
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

  componentDidMount() {
    if (window.location.pathname === "/login/confirmed") {
      this.setState({ confirmed: true });
    }
  }

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

  render() {
    return (
      <StyledCard big loginCard>
        <StyledSubHeading>Login</StyledSubHeading>
        {this.state.confirmed && (
          <Message success role="alert">
            Your account is Activated! Please log in.
          </Message>
        )}
        <StyledFormContainer oneColumn>
          <div className="login-form">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Login")}
            </form>
          </div>
        </StyledFormContainer>
      </StyledCard>
    );
  }
}

export default LoginForm;
