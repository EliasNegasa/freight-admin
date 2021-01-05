import React from "react";
import { Link } from "react-router-dom";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import SearchBox from "../common/searchBox";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import Popup from "../common/popup";
import LowbedForm from "./lowbedForm";
import TableBox from "../common/table";
import ActionButton from "../common/button";

const LowbedsTable = ({
  lowbeds,
  onSort,
  sortColumn,
  searchValue,
  onSearchChange,
  onUpdated,
}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [id, setId] = useState("");

  const columns = [
    { path: "name", label: "Name" },
    { path: "licensePlate", label: "License Plate" },
    { path: "user.firstName", label: "Owner" },
    { path: "horsePower", label: "Horse Power" },
    { path: "manufacturingYear", label: "Year of Manufacturing" },
    { path: "madeIn", label: "Made In" },
    {
      key: "edit",
      content: (account) => (
        <div>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleClickOpen(account.id)}
          >
            <EditOutlinedIcon style={{ color: "#f9b115" }} />
          </span>
          <Link to={`/lowbeds/${account.id}/details`}>
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
        label="Add Machinery"
        icon={<AddIcon />}
      />
      <SearchBox value={searchValue} onChange={onSearchChange} />
      <TableBox
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
        data={lowbeds}
      />
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setId={setId}
        title={id ? <span>Edit Machine</span> : <span>Add Machine</span>}
      >
        <LowbedForm
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

export default LowbedsTable;

// class LowbedsTable extends Component {
//   columns = [
//     { path: "licensePlate", label: "License Plate" },
//     { path: "user.firstName", label: "Lowbed Owner" },
//     { path: "tyreNo", label: "No. of Tyres" },
//     { path: "horsePower", label: "Horse Power" },
//     { path: "manufacturingYear", label: "Year of Manufacturing" },
//     { path: "madeIn", label: "Made In" },
//     {
//       key: "edit",
//       content: (account) => (
//         <div>
//           <Link to={`/lowbeds/${account.id}`}>
//             <EditOutlinedIcon style={{ color: "#f9b115" }} />
//           </Link>
//           <Link to={`/lowbeds/${account.id}/details`}>
//             <VisibilityOutlinedIcon style={{ color: "#000" }} />
//           </Link>
//         </div>
//       ),
//     },
//   ];

//   render() {
//     const { lowbeds, onSort, sortColumn } = this.props;
//     return (
//       <>
//         <StyledButton square right>
//           <LocalShippingOutlinedIcon /> Add Lowbed
//         </StyledButton>
//         <SearchBox value={this.searchQuery} onChange={this.handleSearch} />
//         <Table
//           columns={this.columns}
//           sortColumn={sortColumn}
//           onSort={onSort}
//           data={lowbeds}
//         />
//       </>
//     );
//   }
// }

// export default LowbedsTable;
