import React, { Component } from "react";
import _ from "lodash";
import Pagination from "../common/pagination";
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
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
    loading: false,
    isUpdated: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: jobs } = await getJobs();
    console.log("JOB DATA", jobs);
    // const { data: jobUser } = await getAccount(this.state.jobs.userId);
    this.setState({ jobs, loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.isUpdated !== this.state.isUpdated) {
      this.setState({ loading: true });
      const { data: jobs } = await getJobs();
      this.setState({ jobs, loading: false, isUpdated: false });
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
      jobs: allJobs,
    } = this.state;

    let filtered = allJobs;
    if (searchQuery)
      filtered = allJobs.filter(
        (j) =>
          j.title.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          j.pickUpDate.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          j.dropOffpDate.toLowerCase().startsWith(searchQuery.toLowerCase())
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

        <JobsTable
          jobs={jobs}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onSearchChange={this.handleSearch}
          searchValue={this.searchQuery}
          onUpdated={this.handleIsUpdated}
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
