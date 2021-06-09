import React, { Component } from "react";
import { connect } from "react-redux";
import AddToCart from "./AddToCart";
import { Link } from "react-router-dom";
import CartTotal from "./CartTotal";
import { Button, Grid, Header, Image, Segment, Table } from "semantic-ui-react";
import { removeItem, subtractQuantity } from "./actions/cartActions";
class Cart extends Component {
  //to remove the item completely
  handleRemove = id => {
    this.props.removeItem(id);
  };

  //to substruct from the quantity
  handleSubtractQuantity = id => {
    this.props.subtractQuantity(id);
  };
  showData() {
    let id = 1;
    let addedItems = this.props.cartItems.map(item => {
      return (
        <Table.Row key={item.id} textAlign="center">
          <Table.Cell>{id++}</Table.Cell>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{"$ " + item.price}</Table.Cell>
          <Table.Cell>
            {"$ " + (item.quantity * item.price).toFixed(2)}
          </Table.Cell>
          <Table.Cell>
            <AddToCart item={item} />
          </Table.Cell>

          <Table.Cell>
            <Button
              onClick={() => {
                this.handleRemove(item.id);
              }}
            >
              Remove Item
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });
    return addedItems;
  }
  render() {
    return (
      <div
        className="table-list"
        style={{
          marginTop: "6vw"
        }}
      >
        {this.props.cartItems.length ? (
          <React.Fragment>
            <Table
              celled
              style={{
                display: "block",
                padding: "2vw",
                border: "0.5px solid teal",
                background: "#fcfef9",
                overflowY: "scroll",
                height: "62vh"
              }}
            >
              <Table.Header>
                <Table.Row textAlign="center">
                  <Table.HeaderCell>S.No</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Price per unit</Table.HeaderCell>
                  <Table.HeaderCell>Total Price</Table.HeaderCell>
                  <Table.HeaderCell width={2}>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Remove From Cart</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <React.Fragment>{this.showData()}</React.Fragment>
              </Table.Body>
            </Table>
            <CartTotal />
          </React.Fragment>
        ) : (
          <Segment vertical>
            <Grid container stackable verticalAlign="middle">
              <Grid.Row>
                <Grid.Column width={8}>
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    Your cart is empty
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    It's a good day to buy items at a great price
                  </p>
                </Grid.Column>
                <Grid.Column floated="right" width={6}>
                  <Image
                    alt="emptycart"
                    rounded
                    src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Link to="/">
                    <Button size="huge">Check Them Out</Button>
                  </Link>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        )}
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
    removeItem: id => {
      dispatch(removeItem(id));
    },

    subtractQuantity: id => {
      dispatch(subtractQuantity(id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
