import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { paginate } from "./../utils/paginate";
import { getAccounts } from "./../services/accountService";
import { StyledButton } from "./styled-components/button";
import AccountsTable from "./accountsTable";
import Pagination from './common/pagination';

class Accounts extends Component {
  state = {
    accounts: [],
    currentPage: 1,
    pageSize: 2,
    searchQuery: "",
    sortColumn: { path: "firstname", order: "asc" },
  };

  async componentDidMount() {
    const { data: accounts } = await getAccounts();
    this.setState({ accounts });
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
      accounts: allAccounts,
    } = this.state;

    let filtered = allAccounts;
    if (searchQuery)
      filtered = allAccounts.filter((m) =>
        m.firstname.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const accounts = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: accounts };
  };

  render() {
    const {
      pageSize,
      currentPage,
      sortColumn,
      accounts: allAccounts,
    } = this.state;

    const { totalCount, data: accounts } = this.getPagedData();
    return (
      <div>
        <StyledButton>
          <Link to="/accounts/new">Add Account</Link>
        </StyledButton>
        <p>Showing {totalCount} Accounts</p>
        {/* <SearchBox value={this.searchQuery} onChange={this.handleSearch} /> */}
        <AccountsTable
          accounts={accounts}
          sortColumn={sortColumn}
          onDelete={this.handleDelete}
          onLike={this.handleLike}
          onSort={this.handleSort}
        />
        <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
      </div>
    );
  }
}

export default Accounts;
