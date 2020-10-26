import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Pagination from "../common/pagination";
import SearchBox from "../common/searchBox";
import { StyledButton } from "../styled-components/button";
import { StyledPaginationContainer } from "../styled-components/containers";
import { StyledSubHeading } from "../styled-components/heading";
import Spinner from "../common/spinner";
import { getJobs } from "../../services/jobService";
import { paginate } from "../../utils/paginate";
import JobsTable from "./jobsTable";

class Jobs extends Component {
  state = {
    jobs: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: jobs } = await getJobs();
    this.setState({ jobs, loading: false });
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
      jobs: allJobs,
    } = this.state;

    let filtered = allJobs;
    if (searchQuery)
      filtered = allJobs.filter((j) =>
        j.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const jobs = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: jobs };
  };

  render() {
    const { pageSize, currentPage, sortColumn, loading } = this.state;

    const { totalCount, data: jobs } = this.getPagedData();

    return (
      <>
        <StyledSubHeading left>Jobs List</StyledSubHeading>
        <StyledButton square right>
          <PersonAddIcon />
          <Link to="/jobs/new">Add Job</Link>
        </StyledButton>
        <SearchBox value={this.searchQuery} onChange={this.handleSearch} />
        <JobsTable
          jobs={jobs}
          sortColumn={sortColumn}
          onDelete={this.handleDelete}
          onLike={this.handleLike}
          onSort={this.handleSort}
        />
        {loading && <Spinner />}

        <StyledPaginationContainer>
          <p>Showing {totalCount} Jobs</p>
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

export default Jobs;
