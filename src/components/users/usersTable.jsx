import React from "react";
import { Link } from "react-router-dom";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import Popup from "../common/popup";
import UserForm from "./userForm";
import { useState } from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchBox from "../common/searchBox";
import TableBox from "../common/table";
import ActionButton from "../common/button";

const UsersTable = ({
  users,
  onSort,
  sortColumn,
  searchValue,
  onSearchChange,
  onUpdated,
}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [id, setId] = useState("");

  const columns = [
    { path: "firstName", label: "First Name" },
    { path: "lastName", label: "Last Name" },
    { path: "email", label: "Email" },
    { path: "username", label: "Username" },
    { path: "userType", label: "User Type" },
    { path: "isActivated", label: "Status" },
    {
      key: "edit",
      content: (user) => (
        <div>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleClickOpen(user.id)}
          >
            <EditOutlinedIcon style={{ color: "#f9b115" }} />
          </span>
          <Link to={`/users/${user.id}/details`}>
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
        label="Add User"
        icon={<PersonAddIcon />}
      />
      <SearchBox value={searchValue} onChange={onSearchChange} />
      <TableBox
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={users}
      />
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setId={setId}
        title={id ? <span>Edit User</span> : <span>Add User</span>}
      >
        <UserForm
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

export default UsersTable;

// class UsersTable extends Component {
//   columns = [
//     { path: "firstName", label: "First Name" },
//     { path: "lastName", label: "Last Name" },
//     { path: "email", label: "Email" },
//     { path: "username", label: "Username" },
//     { path: "userType", label: "User Type" },
//     { path: "isActivated", label: "Status" },
//     {
//       key: "edit",
//       content: (user) => (
//         <div>
//           <Link to={`/users/${user.id}`}>
//             <EditOutlinedIcon style={{ color: "#f9b115" }} />
//           </Link>
//           <Link to={`/users/${user.id}/details`}>
//             <VisibilityOutlinedIcon style={{ color: "#000" }} />
//           </Link>
//         </div>
//       ),
//     },
//   ];

//   render() {
//     const { users, onSort, sortColumn } = this.props;
//     return (
//       <>
//         <Table
//           columns={this.columns}
//           sortColumn={sortColumn}
//           onSort={onSort}
//           data={users}
//         />
//       </>
//     );
//   }
// }
