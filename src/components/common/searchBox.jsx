import { Grid, TextField } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React from "react";
import { StyledSearch } from "../styled-components/styledForm";
import searchicon from "../../searchicon.png";

const SearchBox = ({ value, onChange }) => {
  return (
    <div className="input-group mb-3">
      <StyledSearch
        type="text"
        name="query"
        className="search-box"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        styles={{ backgroundImage: `url(${searchicon})` }}
      />
    </div>
  );
};

export default SearchBox;
