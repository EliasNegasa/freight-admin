import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/home";
import SideBar from "./components/sidebar";
import {
  StyledContainer,
  StyledContent,
  StyledSubContainer,
} from "./components/styled-components/containers";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Accounts from './components/account/accounts';
import auth from "./services/authService";
import AccountForm from "./components/account/accountForm";
import Machine from "./components/machine/machine";
import MachineForm from "./components/machine/machineForm";
import AccountDetails from "./components/account/accountDetails";
import NotFound from "./components/notFound";
import Header from "./components/header";
import Jobs from "./components/jobs/jobs";
import Requests from "./components/request/requests";


class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <>
        {!user &&
          <>
            <Route
              exact path="/"
              render={(props) => {
                if (!user) {
                  return <Redirect to="/login" />;
                }
                return <Home {...props} user={user} />;
              }}
            />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login/confirmed" component={LoginForm} />
            <Route path="/login" component={LoginForm} />
          </>}

        {user && <SideBar />}
        {user && <Header />}
        {user && <StyledContainer>
          <StyledContent>
            <StyledSubContainer>
              <Switch>
                <Redirect exact from="/accounts/:id/details" to="/accounts/:id/details/personalTab" />
                <Route exact path="/accounts/:id/details/:tabUrl?" render={props => <AccountDetails {...props} />} />
                <Route path="/accounts/:id" component={AccountForm} />
                <Route path="/accounts" component={Accounts} />
                <Route path='/machines/:id' component={MachineForm} />
                <Route path='/machines' component={Machine} />
                <Route path='/jobs' component={Jobs} />
                <Route path='/requests' component={Requests} />
                <Route path="/logout" component={LoginForm} />

                <Route path="/dashboard" component={Home} />
                <Redirect exact from="/" to="/dashboard" />
                <Route path="/not-found" component={NotFound} />
                <Redirect to="/not-found" />
              </Switch>
            </StyledSubContainer>
          </StyledContent>
        </StyledContainer>}
      </>
    );
  }
}

export default App;
