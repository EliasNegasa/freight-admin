import React, { Component } from "react";
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
import { getUser, saveUser } from "../../services/userService";

class UserPersonalDetails extends Component {
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
    user: {},
    address: {},
    lowbeds: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: user } = await getUser(this.props.id);
    const { data: lowbeds } = await filterLowbeds(`userId=${this.props.id}`);
    this.setState({
      user,
      address: user.address,
      lowbeds,
      loading: false,
    });
  }

  handleActivate = async () => {
    const user = { ...this.state.user };

    const { data } = await saveUser({
      id: user.id,
      isActivated: !user.isActivated,
    });
    this.setState({ user: data.result });
    console.log("Activated", this.state.user);
  };

  handleDelete = async () => {
    const user = { ...this.state.user };

    const { data } = await saveUser({
      id: user.id,
      deleted: !user.deleted,
    });
    this.setState({ user: data.result });
    console.log("Deleted", this.state.user);
  };

  render() {
    const { user, lowbeds, loading } = this.state;
    return (
      <>
        {loading && <Spinner />}
        {!loading && (
          <>
            <StyledFlex smallWidth right>
              {!user.isActivated ? (
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
                Delete User
              </StyledButton>
            </StyledFlex>

            <StyledSubHeading left>Personal Details</StyledSubHeading>
            <StyledFlex>
              <StyledCard big left smallShadow>
                <div style={{ textAlign: "center" }}>
                  {user && (
                    <AvatarImage
                      alt={user.firstName}
                      src={user.picture ? user.picture.filePath : "#"}
                      styleClass="large"
                    />
                  )}
                  <strong>
                    {user.firstName} {user.lastName}
                    <br />
                    <small style={{ color: "rgba(52, 49, 76, 0.54)" }}>
                      {user.userType}
                    </small>
                  </strong>
                </div>

                {user && (
                  <DetailTable data={user} rows={this.rows.personalRow} />
                )}
              </StyledCard>
              <StyledCard big left smallShadow>
                <div style={{ textAlign: "center" }}>
                  <strong>Address Information</strong>
                </div>

                {user && user.address && (
                  <DetailTable
                    data={user.address}
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

export default UserPersonalDetails;
