import React, { Component } from "react";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { Link } from "react-router-dom";
import Table from "../common/table";

class JobsTable extends Component {
  columns = [
    { path: "title", label: "Job Title" },
    { path: "postedBy", label: "Posted By" },
    { path: "data", label: "Date" },
    { path: "location", label: "Location" },
    { path: "status", label: "Status" },
    {
      key: "edit",
      content: (account) => (
        <div>
          <Link to={`/jobs/${account.id}`}>
            <EditOutlinedIcon style={{ color: "#f9b115" }} />
          </Link>
          <Link to={`/jobs/${account.id}/details`}>
            <VisibilityOutlinedIcon style={{ color: "#000" }} />
          </Link>
        </div>
      ),
    },
  ];
  state = {};
  render() {
    const { jobs, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={jobs}
      />
    );
  }
}

export default JobsTable;
