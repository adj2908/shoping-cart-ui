import React, { Component } from "react";
import { Grid, Dropdown, Input } from "semantic-ui-react";
import { dropdownFilter, searchFilter } from "./actions/cartActions";

import { connect } from "react-redux";

class TableFilter extends Component {
  optionsDropdown = () => {
    let options = this.props.products.map(({ type }) => ({
      value: type,
      text: type
    }));
    let jsonObject = options.map(JSON.stringify);
    let uniqueArray = Array.from(new Set(jsonObject)).map(JSON.parse);
    return uniqueArray;
  };
  dropDownChangeHandler = (e, data) => {
    this.props.dropdownFilter(data.value);
  };

  inputChangeHandler = e => {
    this.props.searchFilter(e.target.value.trim());
  };
  render() {
    return (
      <div>
        <Grid>
          <Grid.Column width={5} style={{ margin: "auto" }}>
            <Dropdown
              placeholder="Select Category"
              fluid
              search
              selection
              options={this.optionsDropdown()}
              onChange={this.dropDownChangeHandler}
              clearable
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <Input
              icon="search"
              focus
              placeholder="Search..."
              onChange={this.inputChangeHandler}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.cartProducts.networkData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dropdownFilter: id => {
      dispatch(dropdownFilter(id));
    },
    searchFilter: id => {
      dispatch(searchFilter(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableFilter);
