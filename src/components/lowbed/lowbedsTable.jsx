import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

class LowbedsTable extends Component {
  columns = [
    { path: "licensePlate", label: "License Plate" },
    { path: "user.firstName", label: "Lowbed Owner" },
    { path: "width", label: "Width" },
    { path: "height", label: "Height" },
    { path: "length", label: "Length" },
    { path: "weight", label: "Weight" },
    { path: "tyreNo", label: "No. of Tyres" },
    { path: "horsePower", label: "Horse Power" },
    { path: "chassieNo", label: "Chassie No." },
    { path: "manufacturingYear", label: "Year of Manufacturing" },
    { path: "madeIn", label: "Made In" },
    {
      key: "edit",
      content: (account) => (
        <div>
          <Link to={`/lowbeds/${account.id}`}>
            <EditOutlinedIcon style={{ color: "#f9b115" }} />
          </Link>
          <Link to={`/lowbeds/${account.id}/details`}>
            <VisibilityOutlinedIcon style={{ color: "#000" }} />
          </Link>
        </div>
      ),
    },
  ];

  render() {
    const { lowbeds, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={lowbeds}
      />
    );
  }
}

export default LowbedsTable;
