import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerBox = ({ selectedDate, onChange, label }) => {
  return (
    <div className="field-div">
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        placeholderText={label}
        className="date-picker"
      />
    </div>
  );
};

export default DatePickerBox;
