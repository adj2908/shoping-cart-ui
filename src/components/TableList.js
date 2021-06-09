import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  Dimmer,
  Loader,
  Button,
  Segment,
  Grid,
  Header,
  Image
} from "semantic-ui-react";
import {
  addToCart,
  loadData,
  removeItem,
  subtractQuantity
} from "./actions/cartActions";
import "./TableList.css";
import TableFilter from "./TableFilter";
import AddToCart from "./AddToCart";

class TableList extends Component {
  componentDidMount() {
    this.props.loadData();
  }
  handleAddToCartClick = id => {
    this.props.addToCart(id);
  };
  handleRemove = id => {
    this.props.removeItem(id);
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  handleSubtractQuantity = id => {
    this.props.subtractQuantity(id);
  };

  showData() {
    let id = 1;
    let itemList = this.props.data.map(item => {
      return (
        <Table.Row key={item.id} textAlign="center">
          <Table.Cell>{id++}</Table.Cell>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{this.capitalizeFirstLetter(item.type)}</Table.Cell>
          <Table.Cell>{"$ " + item.price}</Table.Cell>
          <Table.Cell textAlign="center">
            <AddToCart item={item} />
          </Table.Cell>
          <Table.Cell>
            <Button
              disabled={!this.props.cartItems.some(el => el.id === item.id)}
              onClick={() => {
                this.handleRemove(item.id);
              }}
            >
              Remove From Cart
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });
    return itemList;
  }

  render() {
    return this.props.loading === true ? (
      <React.Fragment>
        <Dimmer active>
          <Loader />
        </Dimmer>
      </React.Fragment>
    ) : (
      <div className="table-list">
        <TableFilter />
        {this.props.data.length !== 0 ? (
          <Table
            celled
            padded
            style={{
              display: "block",
              padding: "0vw 2vw",
              border: "0.5px solid teal",
              background: "#fcfef9",
              overflowY: "scroll",
              height: "90vh"
            }}
          >
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell>S.No</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell width={2}>Add To Cart </Table.HeaderCell>
                <Table.HeaderCell>Remove from Cart </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <React.Fragment>{this.showData()}</React.Fragment>
            </Table.Body>
          </Table>
        ) : (
          <Segment vertical style={{ marginTop: "12vw" }}>
            <Grid container stackable verticalAlign="middle">
              <Grid.Row>
                <Grid.Column width={8}>
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    Sorry, no results found!
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    Please check the spelling or try searching for something
                    else
                  </p>
                </Grid.Column>
                <Grid.Column floated="right" width={6}>
                  <Image
                    alt="emptycart"
                    rounded
                    src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png"
                  />
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
  // it takes your state which is part of app store and pass it into component as a prop
  return {
    cartItems: state.cartProducts.addedItems,
    data: state.cartProducts.filteredData,
    loading: state.cartProducts.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: id => {
      dispatch(addToCart(id));
    },
    loadData: () => {
      dispatch(loadData());
    },
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
)(TableList);
//currying
