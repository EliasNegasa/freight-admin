import React, { Component } from "react";
import { StyledTh, StyledTr } from "../styled-components/styledTable";

class TableHeader extends Component {
  raiseSort(path) {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else sortColumn.path = path;
    this.props.onSort(sortColumn);
  }

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <StyledTr>
          {this.props.columns.map((column) => (
            <StyledTh
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
              scope="col"
            >
              {column.label} {this.renderSortIcon(column)}
            </StyledTh>
          ))}
        </StyledTr>
      </thead>
    );
  }
}

export default TableHeader;
