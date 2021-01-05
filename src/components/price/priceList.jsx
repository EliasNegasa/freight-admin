import React from "react";
import { useState } from "react";
import { StyledListGroup, StylesList } from "../styled-components/lists";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Popup from "../common/popup";
import PriceForm from "./priceForm";
import AddIcon from "@material-ui/icons/Add";
import ActionButton from "../common/button";

const PriceList = ({ prices, onUpdated }) => {
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
        label="Add Price Rate"
        icon={<AddIcon />}
      />
      <StyledListGroup>
        {prices.map((price) => (
          <StylesList key={price.id}>
            <div>
              <div>
                <div className="name">{price.name}</div>
                <div className="description">
                  Weight Price: {price.weightPrice}
                </div>
                <div className="description">
                  Onroad Price: {price.onRoadPrice}
                </div>
                <div className="description">
                  Offroad Price: {price.offRoadPrice}
                </div>
              </div>
              <div className="icons-container">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClickOpen(price.id)}
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
        title={id ? <span>Edit Price Rate</span> : <span>Add Price Rate</span>}
      >
        <PriceForm
          id={id}
          setOpenPopup={setOpenPopup}
          setId={setId}
          onUpdated={onUpdated}
        />
      </Popup>
    </>
  );
};

export default PriceList;
