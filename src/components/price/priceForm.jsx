import React from "react";
import { getPrice, savePrice } from "../../services/priceService";
import Form from "../common/form";
import { StyledSubHeading } from "../styled-components/heading";
import { StyledFormContainer } from "../styled-components/styledForm";

const Joi = require("joi-browser");

class PriceForm extends Form {
  state = {
    data: {
      name: "",
      weightPrice: "",
      onRoadPrice: "",
      offRoadPrice: "",
      isDefault: false,
    },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Price Name"),
    weightPrice: Joi.number().required().label("Weight Price"),
    onRoadPrice: Joi.number().required().label("Onroad Price"),
    offRoadPrice: Joi.number().required().label("OffPrice Price"),
    isDefault: Joi.boolean().label("Default Price"),
  };

  populatePrice = async () => {
    try {
      const priceId = this.props.id;
      if (priceId === "") return;

      const { data: price } = await getPrice(priceId);

      console.log("Price DATA", price);
      this.setState({ data: this.mapToViewModel(price) });
    } catch (ex) {
      this.props.history.replace("/not-found");
    }
  };

  async componentDidMount() {
    await this.populatePrice();
  }

  mapToViewModel = (price) => {
    return {
      id: price.id,
      name: price.name,
      weightPrice: price.weightPrice,
      onRoadPrice: price.onRoadPrice,
      offRoadPrice: price.offRoadPrice,
      isDefault: price.isDefault,
    };
  };

  mapToFormData = (jsonPrice) => {
    const formData = new FormData();

    Object.keys(jsonPrice).forEach((key) => {
      formData.append(key, jsonPrice[key]);
    });

    return formData;
  };

  doSubmit = async () => {
    const data = this.mapToFormData(this.state.data);
    await savePrice(data);
    console.log("Saved");
    this.props.setOpenPopup(false);
    this.props.setId("");
    this.props.onUpdated();
    // this.props.history.push("/prices");
  };

  render() {
    return (
      <div>
        <StyledFormContainer oneColumn>
          <div className="login-form">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("name", "Price Name")}
              {this.renderInput("weightPrice", "Weight Price", "Number")}
              {this.renderInput("onRoadPrice", "Onroad Price", "Number")}
              {this.renderInput("offRoadPrice", "Offroad Price", "Number")}
              {this.renderCheckBox("isDefault", "Make default Rate")}
              <div style={{ margin: "3px 30px 15px auto" }}>
                {this.renderButton("Save")}
              </div>
            </form>
          </div>
        </StyledFormContainer>
      </div>
    );
  }
}

export default PriceForm;
