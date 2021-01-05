import React from "react";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import MapIcon from "@material-ui/icons/Map";
import { Link } from "react-router-dom";
import Popup from "../common/popup";
import JobForm from "./jobForm";
import SearchBox from "../common/searchBox";
import { useState } from "react";
import TableBox from "../common/table";
import AddressForm from "./addressForm";
import ActionButton from "../common/button";
import AddIcon from "@material-ui/icons/Add";

const JobsTable = ({
  jobs,
  onSort,
  sortColumn,
  searchValue,
  onSearchChange,
  onUpdated,
}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [id, setId] = useState("");
  const [isAddress, setIsAddress] = useState(false);

  const columns = [
    { path: "title", label: "Job Title" },
    { path: "pickUpDate", label: "Pick-up Date" },
    { path: "pickUpAddress.city", label: "Pick-up Address" },
    { path: "dropOffpDate", label: "Drop-off Date" },
    { path: "dropOffAddress.city", label: "Drop-off Address" },
    { path: "status", label: "Status" },
    { path: "user.firstName", label: "Posted By" },
    {
      key: "edit",
      content: (job) => (
        <div>
          <Link to={`/jobs/${job.id}/details`}>
            <VisibilityOutlinedIcon style={{ color: "#000" }} />
          </Link>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleClickOpen(job.id, false)}
          >
            <EditOutlinedIcon style={{ color: "#f9b115" }} />
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleClickOpen(job.id, true)}
          >
            <MapIcon style={{ color: "#6b6b6b" }} />
          </span>
        </div>
      ),
    },
  ];

  const handleClickOpen = (id, isAddress) => {
    setOpenPopup(true);
    setId(id);
    setIsAddress(isAddress);
  };

  return (
    <>
      <ActionButton
        onClick={() => setOpenPopup(true)}
        label="Add Job"
        icon={<AddIcon />}
      />

      <SearchBox value={searchValue} onChange={onSearchChange} />
      <TableBox
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={jobs}
      />
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setId={setId}
        size={isAddress ? "sm" : "md"}
        title={id ? <span>Edit Job</span> : <span>Add Job</span>}
      >
        {isAddress ? (
          <AddressForm
            id={id}
            setOpenPopup={setOpenPopup}
            openPopup={openPopup}
            setId={setId}
          />
        ) : (
          <JobForm
            id={id}
            setOpenPopup={setOpenPopup}
            openPopup={openPopup}
            setId={setId}
            onUpdated={onUpdated}
          />
        )}
      </Popup>
    </>
  );
};

export default JobsTable;


  /* <StyledButton square right onClick={() => setOpenPopup(true)}>
        <PersonAddIcon />
        Add Job
      </StyledButton> */


// class JobsTable extends Component {
//   columns = [
//     { path: "title", label: "Job Title" },
//     { path: "pickUpDate", label: "Pick-up Date" },
//     { path: "pickUpAddress.city", label: "Pick-up Address" },
//     { path: "dropOffpDate", label: "Drop-off Date" },
//     { path: "dropOffAddress.city", label: "Drop-off Address" },
//     { path: "status", label: "Status" },
//     { path: "user.firstName", label: "Posted By" },
//     {
//       key: "edit",
//       content: (job) => (
//         <div>
//           <Link to={`/jobs/${job.id}/details`}>
//             <VisibilityOutlinedIcon style={{ color: "#000" }} />
//           </Link>
//           <Link to={`/jobs/${job.id}`}>
//             <EditOutlinedIcon style={{ color: "#f9b115" }} />
//           </Link>
//           <span
//             style={{ cursor: "pointer" }}
//             onClick={() => this.handleClickOpen(job.id)}
//           >
//             <MapIcon style={{ color: "#6b6b6b" }} />
//           </span>
//         </div>
//       ),
//     },
//   ];
//   state = {
//     open: false,
//     id: "",
//   };

//   handleClickOpen = (id) => {
//     this.setState({ open: true, id });
//   };

//   handleClickClose = (id) => {
//     this.setState({ open: false, id });
//   };

//   render() {
//     const { jobs, onSort, sortColumn } = this.props;
//     return (
//       <>
//         <Table
//           columns={this.columns}
//           sortColumn={sortColumn}
//           onSort={onSort}
//           data={jobs}
//         />
//         <Popup open={this.state.open} onClose={this.handleClickClose}>
//           <AddressForm id={this.state.id} onClose={this.handleClickClose}/>
//         </Popup>
//       </>
//     );
//   }
// }

// export default JobsTable;s
