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
import JobForm from "./components/jobs/jobForm";
import Doc from "./components/doc";
import Lowbeds from "./components/lowbed/lowbeds";
import LowbedForm from "./components/lowbed/lowbedForm";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import JobDetails from "./components/jobs/jobDetails";


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
        <ReactNotification />
        <Doc />
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
            <Route exact path="/login" component={LoginForm} />
          </>}

        {user && <SideBar />}
        {user && <Header user={this.state.user} />}
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
                <Route path="/jobs/:id/details" component={JobDetails} />
                <Route path='/jobs/:id' component={JobForm} />
                <Route path='/jobs' component={Jobs} />
                <Route path='/lowbeds/:id' component={LowbedForm} />
                <Route path='/lowbeds' component={Lowbeds} />
                <Route path='/requests/:id' component={Requests} />
                <Route path='/requests' component={Requests} />
                <Route path="/logout" component={LoginForm} />

                <Redirect exact from="/" to="/dashboard" />
                <Route path="/dashboard" component={Home} />
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
