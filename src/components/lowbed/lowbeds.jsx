import React, { Component } from "react";
import _ from "lodash";
import { getLowbeds } from "../../services/lowbedService";
import { StyledSubHeading } from "../styled-components/heading";
import { paginate } from "../../utils/paginate";
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
    isUpdated: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: lowbeds } = await getLowbeds();
    this.setState({ lowbeds, loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.isUpdated !== this.state.isUpdated) {
      this.setState({ loading: true });
      const { data: lowbeds } = await getLowbeds();
      this.setState({ lowbeds, loading: false, isUpdated: false });
    }
  }

  handleIsUpdated = () => {
    this.setState({ isUpdated: true });
  };

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
          lowbed.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
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
        <StyledSubHeading left>Registered Machineries</StyledSubHeading>

        <LowbedsTable
          lowbeds={lowbeds}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onSearchChange={this.handleSearch}
          searchValue={this.searchQuery}
          onUpdated={this.handleIsUpdated}
        />
        {loading && <Spinner />}

        <StyledPaginationContainer>
          <p>Showing {totalCount} Machineries</p>
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
