import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

class AccountsTable extends Component {
  columns = [
    { path: "firstName", label: "First Name" },
    { path: "lastName", label: "Last Name" },
    { path: "email", label: "Email" },
    { path: "username", label: "Username" },
    { path: "userType", label: "Account Type" },
    { path: "isActivated", label: "Status" },
    {
      key: "edit",
      content: (account) => (
        <div>
          <Link to={`/accounts/${account.id}`}>
            <EditOutlinedIcon style={{ color: "#f9b115" }} />
          </Link>
          <Link to={`/accounts/${account.id}/details`}>
            <VisibilityOutlinedIcon style={{ color: "#000" }} />
          </Link>
        </div>
      ),
    },
  ];

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
