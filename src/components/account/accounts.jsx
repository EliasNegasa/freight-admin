import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { paginate } from "../../utils/paginate";
import { getAccounts } from "../../services/accountService";
import { StyledButton } from "../styled-components/button";
import AccountsTable from "./accountsTable";
import Pagination from "../common/pagination";
import { StyledPaginationContainer } from "../styled-components/containers";
import { StyledSubHeading } from "../styled-components/heading";
import SearchBox from "../common/searchBox";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Spinner from "../common/spinner";

class Accounts extends Component {
  state = {
    accounts: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "firstname", order: "asc" },
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: accounts } = await getAccounts();
    this.setState({ accounts, loading: false });
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
      filtered = allAccounts.filter(
        (acc) =>
          acc.firstName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          acc.lastName.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          acc.email.toLowerCase().startsWith(searchQuery.toLowerCase())
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
        <StyledSubHeading left>Accounts List</StyledSubHeading>
        <StyledButton square right>
          <PersonAddIcon />
          <Link to="/accounts/new">Add Account</Link>
        </StyledButton>
        <SearchBox value={this.searchQuery} onChange={this.handleSearch} />
        <AccountsTable
          accounts={accounts}
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

export default Accounts;
