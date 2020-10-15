import React, { Component } from "react";
import Table from "./common/table";
import { StyledButton } from "./styled-components/button";

class AccountsTable extends Component {
  columns = [
    { path: "firstName", label: "First Name" },
    { path: "lastName", label: "Last Name" },
    { path: "email", label: "Email" },
    { path: "username", label: "Username" },
    { path: "userType", label: "Account Type" },
    { path: "isActivated", label: "Status" },
    {
      key: "delete",
      // content: (account) => (
      //   <StyledButton
      //     onClick={() => this.props.onDelete(account)}
      //     className="btn btn-danger btn-sm"
      //   >
      //     Delete
      //   </StyledButton>
      // ),
    },
  ];

  state = {};
  render() {
    const { accounts, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={accounts}
      />
    );
  }
}

export default AccountsTable;
