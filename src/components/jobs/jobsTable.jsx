import React, { Component } from "react";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { Link } from "react-router-dom";
import Table from "../common/table";

class JobsTable extends Component {
  columns = [
    { path: "title", label: "Job Title" },
    { path: "pickUpDate", label: "Pick-up Date" },
    { path: "pickUpAddress.city", label: "Pick-up Address" },
    { path: "dropOffpDate", label: "Drop-off Date" },
    { path: "dropOffAddress.city", label: "Drop-off Address" },
    { path: "status", label: "Status" },
    { path: "user.firstName", label: "Posted By" },
    {
      key: "edit",
      content: (job) => (
        <div>
          <Link to={`/jobs/${job.id}`}>
            <EditOutlinedIcon style={{ color: "#f9b115" }} />
          </Link>
          <Link to={`/jobs/${job.id}/details`}>
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
