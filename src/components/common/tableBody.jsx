import React, { Component } from "react";
import _ from "lodash";
import { StyledTd, StyledTr } from "../styled-components/styledTable";
import { StyledBadge } from "../styled-components/containers";
import { ContactsOutlined } from "@material-ui/icons";
import { formatDate } from "../../utils/formatDate";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    const cellData = _.get(item, column.path);
    if (cellData === true) return <StyledBadge approved>Active</StyledBadge>;
    else if (cellData === false)
      return <StyledBadge inactive>InActive</StyledBadge>;
    else if (
      typeof cellData === "string" &&
      cellData.includes(".000Z")
    )
      return formatDate(cellData);
    return cellData;
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <StyledTr key={item.id}>
            {columns.map((column) => (
              <StyledTd key={item.id + (column.path || column.key)}>
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
