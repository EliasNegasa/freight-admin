import React, { Component } from "react";
import _ from "lodash";
import { getLowbeds } from "../../services/lowbedService";
import { StyledSubHeading } from "../styled-components/heading";
import { paginate } from "../../utils/paginate";
import { StyledButton } from "../styled-components/button";
import { Link } from "react-router-dom";
import SearchBox from "../common/searchBox";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import LowbedsTable from "./lowbedsTable";
import { StyledPaginationContainer } from "../styled-components/containers";
import Pagination from "../common/pagination";
import Spinner from "../common/spinner";

class Lowbeds extends Component {
  state = {
    lowbeds: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "licensePlate", order: "asc" },
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: lowbeds } = await getLowbeds();
    this.setState({ lowbeds, loading: false });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      searchQuery,
      sortColumn,
      lowbeds: allLowbeds,
    } = this.state;

    let filtered = allLowbeds;
    if (searchQuery)
      filtered = allLowbeds.filter(
        (lowbed) =>
          lowbed.licensePlate
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          lowbed.motorNo.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          lowbed.user.firstName
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          lowbed.user.lastName
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase()) ||
          lowbed.chassieNo.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const lowbeds = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: lowbeds };
  };

  render() {
    const { pageSize, currentPage, sortColumn, loading } = this.state;

    const { totalCount, data: lowbeds } = this.getPagedData();

    return (
      <>
        <StyledSubHeading left>Registered Lowbeds</StyledSubHeading>
        <StyledButton square right>
          <LocalShippingOutlinedIcon />
          <Link to="/lowbeds/new">Add Lowbed</Link>
        </StyledButton>
        <SearchBox value={this.searchQuery} onChange={this.handleSearch} />
        <LowbedsTable
          lowbeds={lowbeds}
          sortColumn={sortColumn}
          onDelete={this.handleDelete}
          onLike={this.handleLike}
          onSort={this.handleSort}
        />
        {loading && <Spinner />}

        <StyledPaginationContainer>
          <p>Showing {totalCount} Accounts</p>
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </StyledPaginationContainer>
      </>
    );
  }
}

export default Lowbeds;
