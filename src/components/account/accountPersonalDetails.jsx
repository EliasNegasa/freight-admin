import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAccount, saveAccount } from "../../services/accountService";
import AvatarImage from "../common/avatar";
import DetailTable from "../common/detailTable";
import { StyledButton } from "../styled-components/button";
import { StyledCard } from "../styled-components/card";
import { StyledFlex } from "../styled-components/containers";
import { StyledSubHeading } from "../styled-components/heading";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import DoneAllOutlinedIcon from "@material-ui/icons/DoneAllOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import Spinner from "../common/spinner";
import { filterLowbeds } from "../../services/lowbedService";

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
    lowbedRow: [
      { cell: "serialNo", label: "Serial Number" },
      { cell: "madeIn", label: "Made In" },
      { cell: "manufacturingYear", label: "Manufacturing Year" },
    ],
  };

  state = {
    account: {},
    address: {},
    lowbeds: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: account } = await getAccount(this.props.id);
    const { data: lowbeds } = await filterLowbeds(`userId=${this.props.id}`);
    this.setState({
      account,
      address: account.address,
      lowbeds,
      loading: false,
    });
  }

  handleActivate = async () => {
    const account = { ...this.state.account };

    const { data } = await saveAccount({
      id: account.id,
      isActivated: !account.isActivated,
    });
    this.setState({ account: data.result });
    console.log("Activated", this.state.account);
  };

  handleDelete = async () => {
    const account = { ...this.state.account };

    const { data } = await saveAccount({
      id: account.id,
      deleted: !account.deleted,
    });
    this.setState({ account: data.result });
    console.log("Deleted", this.state.account);
  };

  render() {
    const { account, lowbeds, loading } = this.state;
    return (
      <>
        {loading && <Spinner />}
        {!loading && (
          <>
            <StyledFlex smallWidth right>
              {!account.isActivated ? (
                <StyledButton
                  square
                  right
                  success
                  onClick={this.handleActivate}
                >
                  <DoneAllOutlinedIcon />
                  Activate
                </StyledButton>
              ) : (
                <StyledButton
                  square
                  right
                  inactive
                  onClick={this.handleActivate}
                >
                  <ClearIcon />
                  Deactivate
                </StyledButton>
              )}
              <StyledButton square right danger onClick={this.handleDelete}>
                <DeleteForeverOutlinedIcon />
                Delete Account
              </StyledButton>
            </StyledFlex>

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

                {account && (
                  <DetailTable data={account} rows={this.rows.personalRow} />
                )}
              </StyledCard>
              <StyledCard big left smallShadow>
                <div style={{ textAlign: "center" }}>
                  <strong>Address Information</strong>
                </div>

                {account && account.address && (
                  <DetailTable
                    data={account.address}
                    rows={this.rows.addressRow}
                  />
                )}
              </StyledCard>
              <StyledCard big left smallShadow>
                <div style={{ textAlign: "center" }}>
                  <strong>Lowbed Information</strong>
                </div>

                {console.log("Lowbeds", lowbeds)}

                {lowbeds &&
                  lowbeds.map((ld) => (
                    <>
                      <small style={{ color: "rgba(52, 49, 76, 0.54)" }}>
                        License Plate: {ld.licensePlate}
                      </small>
                      <DetailTable data={ld} rows={this.rows.lowbedRow} />
                    </>
                  ))}
              </StyledCard>
            </StyledFlex>
          </>
        )}
      </>
    );
  }
}

export default AccountPersonalDetails;
