import React, { Component } from "react";
import _ from "lodash";
import { StyledTd, StyledTr } from "../styled-components/styledTable";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <StyledTr key={item._id}>
            {columns.map((column) => (
              <StyledTd key={item._id + (column.path || column.key)}>
                {this.renderCell(item, column)}
              </StyledTd>
            ))}
          </StyledTr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
