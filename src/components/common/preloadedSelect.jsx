import React from "react";
import Select from "react-select";

const PreloadedSelect = ({ placeholder, options, ...rest }) => {
  return (
    <>
      <div className="field-div">
        <Select
          options={options}
          placeholder={`Select ${placeholder}`}
          {...rest}
        />
      </div>
      {/* <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={this.state.selectOptions}
        /> */}
    </>
  );
};

export default PreloadedSelect;
