import React, { Component } from "react";
import Spinner from "../common/spinner";
import { StyledSubHeading } from "../styled-components/heading";
import { getPrices } from "../../services/priceService";
import PriceList from "./priceList";

class Price extends Component {
  state = {
    prices: [],
    loading: false,
    isUpdated: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: prices } = await getPrices();
    this.setState({ prices, loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.isUpdated !== this.state.isUpdated) {
      // this.setState({ loading: true });
      const { data: prices } = await getPrices();
      this.setState({ prices, isUpdated: false });
    }
  }

  handleIsUpdated = () => {
    this.setState({ isUpdated: true });
  };

  render() {
    const { prices, loading } = this.state;

    return (
      <>
        <StyledSubHeading left>Price Rate List</StyledSubHeading>
        {loading && <Spinner />}
        <PriceList prices={prices} onUpdated={this.handleIsUpdated} />
      </>
    );
  }
}

export default Price;
