import React, { Component } from "react";
import _ from "lodash";
import { paginate } from "../../utils/paginate";
import { getUsers } from "../../services/userService";
import Pagination from "../common/pagination";
import { StyledPaginationContainer } from "../styled-components/containers";
import { StyledSubHeading } from "../styled-components/heading";
import Spinner from "../common/spinner";
import UsersTable from "./usersTable";

class Users extends Component {
  state = {
    users: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "firstname", order: "asc" },
    loading: false,
    isUpdated: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: users } = await getUsers();
    this.setState({ users, loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.isUpdated !== this.state.isUpdated) {
      this.setState({ loading: true });
      const { data: users } = await getUsers();
      this.setState({ users, loading: false, isUpdated: false });
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
      users: allUsers,
    } = this.state;

    let filtered = allUsers;
    if (searchQuery)
      filtered = allUsers.filter(
        (user) =>
          user.firstName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          user.lastName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const users = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: users };
  };

  render() {
    const { pageSize, currentPage, sortColumn, loading } = this.state;

    const { totalCount, data: users } = this.getPagedData();
    return (
      <>
        <StyledSubHeading left>Users List</StyledSubHeading>
        <UsersTable
          users={users}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onSearchChange={this.handleSearch}
          searchValue={this.searchQuery}
          onUpdated={this.handleIsUpdated}
        />
        {loading && <Spinner />}

        <StyledPaginationContainer>
          <p>Showing {totalCount} Users</p>
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

export default Users;
