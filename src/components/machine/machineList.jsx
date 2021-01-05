import React from "react";
import { useState } from "react";
import Popup from "../common/popup";
import { StyledListGroup, StylesList } from "../styled-components/lists";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AddIcon from "@material-ui/icons/Add";
import MachineForm from "./machineForm";
import ActionButton from "../common/button";

const MachineList = ({ machines, onUpdated }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [id, setId] = useState("");

  const handleClickOpen = (id) => {
    setOpenPopup(true);
    setId(id);
  };

  return (
    <>
      <ActionButton
        onClick={() => setOpenPopup(true)}
        label="Add Machine"
        icon={<AddIcon />}
      />
      <StyledListGroup>
        {machines.map((machine) => (
          <StylesList key={machine.id}>
            <div>
              <div>
                <div className="name">{machine.name}</div>
                <div className="description">{machine.description}</div>
              </div>
              <div className="icons-container">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClickOpen(machine.id)}
                >
                  <EditOutlinedIcon style={{ color: "#f9b115" }} />
                </span>
              </div>
            </div>
          </StylesList>
        ))}
      </StyledListGroup>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setId={setId}
        title={id ? <span>Edit Machine</span> : <span>Add Machine</span>}
      >
        <MachineForm
          id={id}
          setOpenPopup={setOpenPopup}
          setId={setId}
          onUpdated={onUpdated}
        />
      </Popup>
    </>
  );
};

export default MachineList;
