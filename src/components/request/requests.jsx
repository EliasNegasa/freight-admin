import React, { Component } from "react";
import { getRequests } from "../../services/requestService";
import { paginate } from "../../utils/paginate";
import _ from "lodash";
import { StyledSubHeading } from "../styled-components/heading";
import { StyledButton } from "../styled-components/button";
import SearchBox from "../common/searchBox";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Link } from "react-router-dom";
import Spinner from "../common/spinner";
import RequestsTable from "./requestsTable";

class Requests extends Component {
  state = {
    requests: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "userId", order: "asc" },
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: requests } = await getRequests();
    console.log("Request DATA", requests);
    this.setState({ requests, loading: false });
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
      requests: allRequests,
    } = this.state;

    let filtered = allRequests;
    if (searchQuery)
      filtered = allRequests.filter(
        (r) =>
          r.userId.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          r.jobId.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const requests = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: requests };
  };

  render() {
    const { pageSize, currentPage, sortColumn, loading } = this.state;

    const { totalCount, data: requests } = this.getPagedData();

    return (
      <>
        <StyledSubHeading left>Requests</StyledSubHeading>
        <StyledButton square right>
          <PersonAddIcon />
          <Link to="/requests/new">Add Request</Link>
        </StyledButton>
        <SearchBox value={this.searchQuery} onChange={this.handleSearch} />
      
        <RequestsTable
          requests={requests}
          sortColumn={sortColumn}
          onDelete={this.handleDelete}
          onLike={this.handleLike}
          onSort={this.handleSort}
        />
        {loading && <Spinner />}
        
      </>
    );
  }
}

export default Requests;
