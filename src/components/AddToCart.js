import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Grid } from "semantic-ui-react";
import { subtractQuantity, addToCart } from "./actions/cartActions";

class AddToCart extends Component {
  handleSubtractQuantity = id => {
    this.props.subtractQuantity(id);
  };
  handleAddToCartClick = id => {
    console.log("clicked");
    this.props.addToCart(id);
  };

  showQuantity = id => {
    if (this.props.cartItems.length > 0) {
      let findItem = this.props.cartItems.find(item => id === item.id);

      if (findItem) {
        return findItem.quantity;
      } else {
        return 0;
      }
    }
    return 0;
  };

  render() {
    return (
      <div
        className="container"
        style={{
          textAlign: "center",
          paddingLeft: "1.5vw"
        }}
      >
        <Grid
          style={{
            textAlgin: "centre"
          }}
        >
          <Grid.Column>
            <Icon
              name="minus circle"
              onClick={() => {
                this.handleSubtractQuantity(this.props.item.id);
              }}
              size="large"
              disabled={
                this.showQuantity(this.props.item.id) === 0 ? true : false
              }
            />
          </Grid.Column>
          <Grid.Column>
            <div
              style={{
                padding: "0vw 1.5vw 0vw 0.4vw",
                border: "1.5px solid black"
              }}
            >
              {this.showQuantity(this.props.item.id)}
            </div>
          </Grid.Column>
          <Grid.Column>
            <Icon
              name="add circle"
              onClick={() => {
                this.handleAddToCartClick(this.props.item.id);
              }}
              size="large"
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartProducts.addedItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: id => {
      dispatch(addToCart(id));
    },
    subtractQuantity: id => {
      dispatch(subtractQuantity(id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToCart);
