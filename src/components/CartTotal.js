import React, { Component } from "react";
import { connect } from "react-redux";
import { Input } from "semantic-ui-react";
import swal from "sweetalert";
import { emptyCart } from "./actions/cartActions";
import "./CartTotal.css";

class cartTotal extends Component {
  buyHandler = (price, noOfItems) => {
    swal({
      title: "Please confirm your order ",
      text: "Price(" + noOfItems + " items):   " + price,
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        swal({
          title: "Order Confirmed",
          text: "Thanks for shopping with us",
          icon: "success",
          button: "Aww yiss!"
        });
        this.props.emptyCart();
      }
    });
  };
  render() {
    return (
      <div
        className="container"
        style={{
          textAlign: "center"
        }}
      >
        <Input
          action={{
            color: "teal",
            labelPosition: "left",
            icon: "cart",
            content: "Proceed to buy",
            onClick: () =>
              this.buyHandler(
                this.props.total.toFixed(2),
                this.props.cartItems.length
              )
          }}
          actionPosition="left"
          value={"$ " + this.props.total.toFixed(2)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    total: state.cartProducts.total,
    cartItems: state.cartProducts.addedItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    emptyCart: () => {
      dispatch(emptyCart());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(cartTotal);
