import React, { Component } from "react";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { Link } from "react-router-dom";
import Table from "../common/table";

class RequestsTable extends Component {
  columns = [
    { path: "title", label: "Requester" },
    { path: "user.firstName", label: "Job Owner" },
    {
      key: "edit",
      content: (request) => (
        <div>
          <Link to={`/requests/${request.id}`}>
            <EditOutlinedIcon style={{ color: "#f9b115" }} />
          </Link>
          <Link to={`/requests/${request.id}/details`}>
            <VisibilityOutlinedIcon style={{ color: "#000" }} />
          </Link>
        </div>
      ),
    },
  ];
  state = {};
  render() {
    const { requests, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={requests}
      />
    );
  }
}

export default RequestsTable;
