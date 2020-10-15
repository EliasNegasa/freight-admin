import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import SideBar from "./components/sidebar";
import {
  StyledContainer,
  StyledContent,
} from "./components/styled-components/containers";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Accounts from './components/accounts';
import auth from "./services/authService";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        {/* {user && <Header />} */}
        <Header />
        <StyledContainer>
          {/* {user && <SideBar />} */}
          <SideBar />
          <StyledContent>
            <Switch>
              <Route path="/register" component={RegisterForm} />
              <Route path="/login/confirmed" component={LoginForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/accounts" component={Accounts} />
              <Route path="/" component={Home} />
              <Redirect to="/not-found" />
            </Switch>
          </StyledContent>
        </StyledContainer>
      </div>
    );
  }
}

export default App;
