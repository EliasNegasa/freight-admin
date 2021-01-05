import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { filterUsers } from "../../services/userService";
import auth from "../../services/authService";

const options = [
  { value: "islamabad", label: "Islamabad" },
  { value: "lahore", label: "Lahore" },
  { value: "karachi", label: "Karachi" },
];

class ReactSelectExample extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedOption: {},
      normalSelectOption: null,
    };
  }

  fetchData = async (inputValue, callback) => {
    const { data } = await filterUsers("firstName=" + inputValue);
    const tempArray = [];

    const options = data.map((d) => ({
      value: d.id,
      label: `${d.firstName} ${d.lastName}`,
    }));

    this.setState({ selectedOption: options });

    // setTimeout(() => {
    //   fetch(
    //     // filterUsers("firstName=" + inputValue),
    //     "https://machinery-api.herokuapp.com/api/users/firstName=" + inputValue,
    //     {
    //       method: "GET",
    //       headers: {
    //         Authorization: "Bearer " + auth.getToken(),
    //       },
    //     }
    //   )
    //     .then((res) => {
    //       return res.json();
    //     })
    //     .then((data) => {
    //       const tempArray = [];
    //       if (data) {
    //         if (data.length) {
    //           data.forEach((element) => {
    //             console.log("ASYNC" + element);
    //             tempArray.push({
    //               label: `${element.body}`,
    //               value: element.id,
    //             });
    //           });
    //         } else {
    //           tempArray.push({
    //             label: `${data.body}`,
    //             value: data.id,
    //           });
    //         }
    //       }
    //       callback(tempArray);
    //     })
    //     .catch((error) => {
    //       console.log(error, "catch the hoop");
    //     });
    // }, 1000);
  };

  onSearchChange = (selectedOption) => {
    if (selectedOption) {
      this.setState({
        selectedOption,
      });
    }
  };
  handleChange = (normalSelectOption) => {
    this.setState({ normalSelectOption });
  };
  render() {
    return (
      <div style={{ marginLeft: "40%", width: "200px" }}>
        <div>
          <p>Local array</p>
          {this.state.normalSelectOption &&
            `Selected Value : ${this.state.normalSelectOption.value}`}

          <Select
            value={this.state.normalSelectOption}
            onChange={this.handleChange}
            options={options}
          />
        </div>

        <div>
          <p>Remote data</p>
          <AsyncSelect
            value={this.state.selectedOption}
            loadOptions={this.fetchData}
            placeholder="Admin Name"
            onChange={(e) => {
              this.onSearchChange(e);
            }}
            defaultOptions={true}
          />
        </div>
      </div>
    );
  }
}

export default ReactSelectExample;
