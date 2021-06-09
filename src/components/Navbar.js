import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Menu, Image, Icon } from "semantic-ui-react";
import { connect } from "react-redux";

class Navbar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item header as={Link} to="/" onClick={this.handleItemClick}>
              <Image
                size="mini"
                src="../logo192.png"
                style={{ marginRight: "1.5em" }}
                alt="logo"
              />
              Shopping
            </Menu.Item>

            <Menu.Item
              name="home"
              active={activeItem === "home"}
              as={Link}
              to="/"
              onClick={this.handleItemClick}
            >
              Shop
            </Menu.Item>

            <Menu.Item
              name="cart"
              active={activeItem === "cart"}
              style={{ marginLeft: "auto", order: "2" }}
              as={Link}
              to="/cart"
              onClick={this.handleItemClick}
            >
              My Cart <Icon name="cart" />
              {this.props.cartItems.length}
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartProducts.addedItems
  };
};

export default connect(mapStateToProps)(Navbar);
