import React, { useContext, useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Context } from '../../ContextProvider';

export function BuyButton({ id, painting }) {
  const {
    user, addToCart, history, myCart, showLogin,
  } = useContext(Context);
  const [buttonText, setButtonText] = useState('Add to Cart');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const cartItem = myCart.orderItems.find(item => item.paintingId === id);

  useEffect(() => {
    if (painting.isPendingSale) {
      setDisabled(true);
      setButtonText('Pending sale');
    }

    if (painting.isSold) {
      setDisabled(true);
      setButtonText('Sold');
    }

    if (cartItem) {
      setDisabled(true);
      setButtonText('Already in your cart');
    }
  }, [painting.isPendingSale, cartItem, painting.isSold]);

  return (
    <Button
      primary
      disabled={disabled}
      loading={loading}
      onClick={() => {
        if (!user) {
          showLogin();
        } else {
          setLoading(true);
          addToCart(id);
          setTimeout(() => history.push('/cart'), 800);
        }
      }}
    >
      {buttonText}
    </Button>
  );
}

BuyButton.propTypes = {
  id: PropTypes.number.isRequired,
  painting: PropTypes.shape({
    isPendingSale: PropTypes.bool.isRequired,
    isSold: PropTypes.bool.isRequired,
  }).isRequired,
};
