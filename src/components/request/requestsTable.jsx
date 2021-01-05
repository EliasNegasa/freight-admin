import React from "react";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import SearchBox from "../common/searchBox";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import Popup from "../common/popup";
import RequestForm from "./requestForm";
import TableBox from "../common/table";
import ActionButton from "../common/button";

const RequestsTable = ({
  requests,
  onSort,
  sortColumn,
  searchValue,
  onSearchChange,
  onUpdated,
}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [id, setId] = useState("");

  const columns = [
    { path: "user.firstName", label: "Requester" },
    { path: "job.title", label: "Job" },
    { path: "job.userId", label: "Job Owner" },
    { path: "lowbed.licensePlate", label: "Assigned Lowbed" },
    { path: "status", label: "Status" },
    {
      key: "edit",
      content: (request) => (
        <div>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleClickOpen(request.id)}
          >
            <EditOutlinedIcon style={{ color: "#f9b115" }} />
          </span>
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
        label="Add Request"
        icon={<AddIcon />}
      />
      <SearchBox value={searchValue} onChange={onSearchChange} />
      <TableBox
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={requests}
      />
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setId={setId}
        title={id ? <span>Edit Request</span> : <span>Add Request</span>}
      >
        <RequestForm
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

export default RequestsTable;

// class RequestsTable extends Component {
//   columns = [
//     { path: "user.firstName", label: "Requester" },
//     { path: "job.title", label: "Job" },
//     { path: "job.userId", label: "Job Owner" },
//     { path: "lowbed.licensePlate", label: "Assigned Lowbed" },
//     { path: "status", label: "Status" },
//     {
//       key: "edit",
//       content: (request) => (
//         <div>
//           <Link to={`/requests/${request.id}`}>
//             <EditOutlinedIcon style={{ color: "#f9b115" }} />
//           </Link>
//         </div>
//       ),
//     },
//   ];
//   state = {};

//   async componentDidMount() {
//     const { data: jobUser } = await getRequest();
//     console.log("JOB USER DATA", jobUser);
//     this.setState({ jobUser });
//   }

//   render() {
//     const { requests, onSort, sortColumn } = this.props;
//     return (
//       <>
//         <StyledButton square right>
//           <PersonAddIcon />
//           <Link to="/requests/new">Add Request</Link>
//         </StyledButton>
//         <SearchBox value={this.searchQuery} onChange={this.handleSearch} />
//         <Table
//           columns={this.columns}
//           sortColumn={sortColumn}
//           onSort={onSort}
//           data={requests}
//         />
//       </>
//     );
//   }
// }

// export default RequestsTable;
