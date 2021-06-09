import React, { Component } from "react";
import { connect } from "react-redux";
import { Input } from "semantic-ui-react";
import swal from "sweetalert";

class cartTotal extends Component {
  buyHandler = () => {
    console.log("cccc");
    swal({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success",
      button: "Aww yiss!"
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
            content: "Proceed to buy"
          }}
          actionPosition="left"
          value={"$ " + this.props.total.toFixed(2)}
          onClick={() => {
            this.buyHandler();
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    total: state.cartProducts.total
  };
};

export default connect(mapStateToProps)(cartTotal);
