import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Menu, Dropdown, Icon, Label,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Context } from '../../ContextProvider';

export function CartMenuItem({ showText, handleClick }) {
  const { myCart } = useContext(Context);
  const numCartItems = myCart.orderItems.length;

  return showText ? (
    <Menu.Item
      key="cart"
      onClick={handleClick}
      value="/cart"
      icon={(
        <Icon.Group>
          <Icon name="shopping cart" />
          {numCartItems ? (
            <Label
              floating
              circular
              size="mini"
              color="orange"
              style={{ top: '-1.5em' }}
            >
              {numCartItems}
            </Label>
          ) : null}
        </Icon.Group>
)}
      name="My Cart"
      label={{ color: 'orange', floating: true, content: numCartItems }}
    />
  ) : (
    <Link to="/cart">
      <Dropdown
        item
        icon={(
          <Icon.Group>
            <Icon name="shopping cart" />
            {numCartItems ? (
              <Label
                floating
                circular
                size="mini"
                color="orange"
                style={{ top: '-1.5em' }}
              >
                {numCartItems}
              </Label>
            ) : null}
          </Icon.Group>
)}
      />
    </Link>
  );
}

CartMenuItem.propTypes = {
  handleClick: PropTypes.func.isRequired,
  showText: PropTypes.bool,
};

CartMenuItem.defaultProps = {
  showText: false,
};
