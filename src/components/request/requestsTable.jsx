import React, { Component } from "react";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { Link } from "react-router-dom";
import Table from "../common/table";
import { getRequest } from "../../services/requestService";

class RequestsTable extends Component {
  columns = [
    { path: "user.firstName", label: "Requester" },
    { path: "job.title", label: "Job" },
    { path: "job.userId", label: "Job Owner" },
    { path: "lowbed.licensePlate", label: "Assigned Lowbed" },
    { path: "status", label: "Status" },
    {
      key: "edit",
      content: (request) => (
        <div>
          <Link to={`/requests/${request.id}`}>
            <EditOutlinedIcon style={{ color: "#f9b115" }} />
          </Link>
        </div>
      ),
    },
  ];
  state = {};

  async componentDidMount() {
    const { data: jobUser } = await getRequest();
    console.log("JOB USER DATA", jobUser);
    this.setState({ jobUser });
  }

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
