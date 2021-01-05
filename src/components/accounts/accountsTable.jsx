import React from "react";
import { Link } from "react-router-dom";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import Popup from "../common/popup";
import { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import SearchBox from "../common/searchBox";
import TableBox from "../common/table";
import AccountForm from "./accountForm";
import ActionButton from "../common/button";

const AccountsTable = ({
  accounts,
  onSort,
  sortColumn,
  searchValue,
  onSearchChange,
  onUpdated,
}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [id, setId] = useState("");

  const columns = [
    { path: "user.firstName", label: "User" },
    { path: "balance", label: "Balance" },
    { path: "lastDeposit", label: "Last Deposit" },
    { path: "totalDeposit", label: "Total Deposit" },
    {
      key: "edit",
      content: (account) => (
        <div>
          <Link
            style={{ cursor: "pointer" }}
            onClick={() => handleClickOpen(account.id)}
          >
            <EditOutlinedIcon style={{ color: "#f9b115" }} />
          </Link>
          <Link to={`/accounts/${account.id}/details`}>
            <VisibilityOutlinedIcon style={{ color: "#000" }} />
          </Link>
        </div>
      ),
    },
  ];

  const handleClickOpen = (id) => {
    setOpenPopup(true);
    setId(id);
  };

  return (
    <>
      <ActionButton
        onClick={() => setOpenPopup(true)}
        label="Add Deposit"
        icon={<AddIcon />}
      />
      <SearchBox value={searchValue} onChange={onSearchChange} />
      <TableBox
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={accounts}
      />
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setId={setId}
        title={id ? <span>Edit Deposit</span> : <span>Add Deposit</span>}
      >
        <AccountForm
          id={id}
          setOpenPopup={setOpenPopup}
          openPopup={openPopup}
          setId={setId}
          onUpdated={onUpdated}
        />
      </Popup>
    </>
  );
};

export default AccountsTable;
