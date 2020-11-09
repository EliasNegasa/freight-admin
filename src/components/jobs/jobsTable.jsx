import React, { Component } from "react";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { Link } from "react-router-dom";
import Table from "../common/table";

class JobsTable extends Component {
  columns = [
    { path: "title", label: "Job Title" },
    { path: "pickUpDate", label: "Pick-up Date" },
    { path: "pickUpAddress.city", label: "Pick-up Address", typo: "date" },
    { path: "dropOffpDate", label: "Drop-off Date" },
    { path: "dropOffAddress.city", label: "Drop-off Address" },
    { path: "weight", label: "Weight" },
    { path: "distance", label: "Distance" },
    // { path: "offRoadDistance", label: "Off-road Distance" },
    { path: "status", label: "Status" },
    { path: "user.firstName", label: "Posted By" },
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
