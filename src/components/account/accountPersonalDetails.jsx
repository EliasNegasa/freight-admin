import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAccount } from "../../services/accountService";
import AvatarImage from "../common/avatar";
import DetailTable from "../common/detailTable";
import { StyledButton } from "../styled-components/button";
import { StyledCard } from "../styled-components/card";
import { StyledFlex } from "../styled-components/containers";
import { StyledSubHeading } from "../styled-components/heading";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import Spinner from "../common/spinner";

class AccountPersonalDetails extends Component {
  rows = {
    personalRow: [
      { cell: "email", label: "Email" },
      { cell: "username", label: "Username" },
      { cell: "phone", label: "Phone" },
      { cell: "isActivated", label: "Status" },
    ],
    addressRow: [
      { cell: "kebele", label: "Kebele" },
      { cell: "woreda", label: "Woreda" },
      { cell: "zone", label: "Zone" },
      { cell: "city", label: "City" },
      { cell: "company", label: "Company" },
    ],
  };

  state = {
    account: {},
    address: {},
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: account } = await getAccount(this.props.id);
    this.setState({
      account,
      address: account.address,
      loading: false,
    });
  }

  render() {
    const { account, address, loading } = this.state;
    return (
      <>
        <StyledButton square right danger>
          <DeleteForeverOutlinedIcon />
          <Link to="#">Delete Account</Link>
        </StyledButton>
        <StyledSubHeading left>Personal Details</StyledSubHeading>
        <StyledFlex>
          <StyledCard big left smallShadow>
            <div style={{ textAlign: "center" }}>
              {account && (
                <AvatarImage
                  alt={account.firstName}
                  src={account.picture ? account.picture.filePath : "#"}
                  styleClass="large"
                />
              )}
              <strong>
                {account.firstName} {account.lastName}
                <br />
                <small style={{ color: "rgba(52, 49, 76, 0.54)" }}>
                  {account.userType}
                </small>
              </strong>
            </div>
            {loading && <Spinner />}
            {account && (
              <DetailTable data={account} rows={this.rows.personalRow} />
            )}
          </StyledCard>
          <StyledCard big left smallShadow>
            <div style={{ textAlign: "center" }}>
              <strong>Address Information</strong>
            </div>
            {loading && <Spinner />}
            {account && account.address && (
              <DetailTable data={account.address} rows={this.rows.addressRow} />
            )}
          </StyledCard>
          <StyledCard big left smallShadow>
            <div style={{ textAlign: "center" }}>
              <strong>Lowbed Information</strong>
            </div>
            {loading && <Spinner />}
            {/* {address && (
              <DetailTable data={address} rows={this.rows.addressRow} />
            )} */}
          </StyledCard>
        </StyledFlex>
      </>
    );
  }
}

export default AccountPersonalDetails;
