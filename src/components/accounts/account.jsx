import React, { Component } from "react";
import _ from "lodash";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import { StyledPaginationContainer } from "../styled-components/containers";
import { StyledSubHeading } from "../styled-components/heading";
import Spinner from "../common/spinner";
import AccountsTable from "./accountsTable";
import { getAccounts } from "../../services/accountService";

class Account extends Component {
  state = {
    accounts: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "firstname", order: "asc" },
    loading: false,
    isUpdated: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: accounts } = await getAccounts();
    this.setState({ accounts, loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.isUpdated !== this.state.isUpdated) {
      this.setState({ loading: true });
      const { data: accounts } = await getAccounts();
      this.setState({ accounts, loading: false, isUpdated: false });
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
      accounts: allAccounts,
    } = this.state;

    let filtered = allAccounts;
    if (searchQuery)
      filtered = allAccounts.filter(
        (account) =>
          account.user.firstName
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase())
          // account.balance.startsWith(searchQuery.toLowerCase()) 
          // account.totalDeposit.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const accounts = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: accounts };
  };

  render() {
    const { pageSize, currentPage, sortColumn, loading } = this.state;

    const { totalCount, data: accounts } = this.getPagedData();
    return (
      <>
        <StyledSubHeading left>Accounts</StyledSubHeading>
        <AccountsTable
          accounts={accounts}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onSearchChange={this.handleSearch}
          searchValue={this.searchQuery}
          onUpdated={this.handleIsUpdated}
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

export default Account;
