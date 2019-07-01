/* eslint react/no-unused-state: 0 */
/* eslint react/no-direct-mutation-state: 0 */
/* eslint react/destructuring-assignment: 0 */


import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase/app';
import { API } from './modules/api/API';
import { ErrorDialog } from './components/utility/ErrorDialog';
import { firebaseCredentials } from './env/firebaseCredentials';
import 'firebase/firebase-storage';
import { ConfirmDialog } from './components/utility/ConfirmDialog';
import { SelectLoginRegister } from './components/Auth/SelectLoginRegister';


const Context = React.createContext();

try {
  firebase.initializeApp(firebaseCredentials);
} catch (e) {
  /* eslint-disable-next-line */
  console.log("You'll need to create a firebase account and provide "
    + 'credentials inside /src/env/firebaseCredentials.js to use this app.'
    + '\n\nError message follows...\n\n', e);
}


export const { Consumer } = Context;

class Provider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(sessionStorage.getItem('userdata')),
      storageRef: firebase.storage().ref(),
      logout: () => {
        sessionStorage.clear();
        this.setState({ user: null });
        /* eslint-disable-next-line */
        this.props.history.push("/");
      },
      /* eslint-disable-next-line */
      history: this.props.history,
      /* eslint-disable-next-line */
      showError: (errorMessage, optionalCallbackFunction) => {
        this.setState({ errorMessage, isErrorDialogVisible: true, handleErrorClose: optionalCallbackFunction });
      },
      showConfirm: confirmObject => this.setState({ confirmObject, isConfirmDialogVisible: true }),
      handleErrorClose: null,
      confirmObject: {},
      errorMessage: '',

      get: {},
      add: {},
      edit: {},
      remove: {},
      myCart: getCartFromSessionStorage(),
      getOpenCart: () => {
        const { user } = this.state;
        if (!user) return null;
        if (user.userType !== 'customer') return null;
        const custId = user.customer.id;

        return API.orders.getMyOpenCart(custId).then(([myCart]) => {
          if (myCart.id) {
          //  Found an existing cart in the database
            sessionStorage.setItem('myCart', JSON.stringify(myCart));
            return this.setState({ myCart });
          }
          //  Did not find an existing cart, so make a new one
          return this.state.createCart();
        });
      },
      updateAll: () => {
        const { user } = this.state;
        const endpoints = [
          'artists',
          'paintings',
          'employees',
          'customers',
          'orders',
          'orderItems',
        ];
        const newState = {};
        return Promise.all(endpoints.map(endpoint => API[endpoint].getAll()))
          .then((data) => { data.forEach((item, index) => { newState[endpoints[index]] = item; }); })
          .then(() => this.setState(newState));

        //  TODO: If user is a customer, get their orders only
        // orders, orderItems, - not fetching these automatically because reasons...
      },
      createCart: async () => {
        const { user, showError, getOpenCart } = this.state;
        if (!user) {
          showError('Only customers can make purchases!');
          return null;
        }
        if (user.userType !== 'customer') {
          showError('Only customers can make purchases!');
          return null;
        }
        const newCart = {
          customerId: user.customer.id,
          isCompleted: false,
          createdTimestamp: new Date(),
          isSubmitted: false,
          isRejected: false,
        };
        return API.orders.create(newCart).then(getOpenCart);
      },
      addToCart: async (paintingId) => {
        const {
          myCart, getOpenCart, user, showError,
        } = this.state;
        if (!user) return null; // TODO: show register/login modal and add to cart when user finishes.
        if (user.userType !== 'customer') {
          //  Artists/employees should not see the "Buy now" control at all, but just in case...
          showError('Only customers can place orders!');
          return null; // TODO: show error
        }


        return API.orderItems.findExisting(myCart.id, paintingId).then((found) => {
          if (found.length === 0) {
            return (
              API.orderItems.create({
                isCancelled: false,
                orderId: myCart.id,
                paintingId,
              }).then(getOpenCart)
            );
          }
          showError('Already in your cart!');
          return null;
        });
      },
      removeFromCart: (paintingId) => {
        const { myCart, getOpenCart } = this.state;
        const itemToRemove = myCart.orderItems.find(cartItem => cartItem.paintingId === paintingId);
        return API.orderItems.edit(itemToRemove.id, { paintingId: null, orderId: null })
          .then(() => API.orderItems.delete(itemToRemove.id))
          .then(getOpenCart);
      },
      submitCart: cartId => API.orders.edit(cartId, { isSubmitted: true }),
      calculateOrderTotal: (orderId) => {
        const { orders, paintings } = this.state;
        const order = orders.find(item => item.id === orderId);
        return order.orderItems.reduce((acc, item) => (!item.isCancelled
          ? acc + paintings.find(painting => painting.id === item.paintingId).currentPrice
          : acc),
        0);
      },
      completeOrder: async (orderId) => {
        const { orders, paintings, calculateOrderTotal } = this.state;
        const order = orders.find(item => item.id === orderId);
        const orderTotal = calculateOrderTotal(orderId);
        let storeProfit = 0;

        function roundDollars(num) {
          return Math.round(num * 100) / 100;
        }


        // Update customer account balance: accountBalance - orderTotal
        await API.customers.edit(order.customerId, {
          accountBalance: order.customer.accountBalance - orderTotal,
        });

        //  Update order in database to reflect sold status and the final order total
        await API.orders.edit(orderId, {
          isCompleted: true,
          orderTotal,
        });

        await order.orderItems.map((item) => {
          const painting = paintings.find(pntg => pntg.id === item.paintingId);

          // Calculate artist's share of profit
          let artistShare = painting.currentPrice * painting.artist.profitRatio;

          // Round to nearest penny
          artistShare = roundDollars(artistShare);

          const storeShare = roundDollars(painting.currentPrice - artistShare);
          storeProfit += storeShare;

          return Promise.all([
            // Update artist account balance: orderTotal * profitRatio
            API.artists.edit(painting.artistId, { accountBalance: painting.artist.accountBalance + artistShare }),

            // Update painting to sold status
            API.paintings.edit(painting.id, {
              isSold: true, isLive: false, artistShare, storeShare,
            }),
          ]);
        });


        // Update store account balance
        return API.stores.get()
          .then(store => API.stores.edit(1, {
            accountBalance: roundDollars(store.accountBalance + storeProfit),
          }))
          // Then update everything

          /* eslint-disable-next-line */
          .then(this.state.updateAll)
      },
      isErrorDialogVisible: false,
      isConfirmDialogVisible: false,
      showLogin: () => this.setState({ isLoginModalVisible: true }),
      isLoginModalVisible: false,
    };


    const endpoints = [
      'employees',
      'artists',
      'customers',
      'paintings',
      'orders',
      'orderItems',
    ];
    endpoints.forEach((endpoint) => {
      //  the 'minus' variable chops off the 's' at the end of each endpoint
      //  i.e. add.painting() instead of add.paintings()
      const minus = endpoint.substring(0, endpoint.length - 1);
      this.state[endpoint] = [];
      this.state.get[endpoint] = async () => this.setState({ [endpoint]: await API[endpoint].getAll() });
      this.state.add[minus] = async obj => API[endpoint].create(obj).then(this.state.get[endpoint]);
      this.state.edit[minus] = (obj, id) => API[endpoint].edit(id, obj).then(this.state.get[endpoint]);
      this.state.remove[minus] = async id => API[endpoint].delete(id).then(this.state.get[endpoint]);
    });
  }


  componentDidMount() {
    /* eslint-disable-next-line */
    this.state.updateAll();
  }


  handleLoginClose = () => this.setState({ isLoginModalVisible: false });

  doLogin = async (username, password) => {
    const { showError, getOpenCart } = this.state;
    sessionStorage.clear();
    const user = await API.users.login(username, password).catch(this.handleInvalidLogin);
    if (user) {
      if (!user.isActive) {
        showError('This user account has been deactivated!');
        return null;
      }
      const { userType } = user;
      const [typeObj] = await API[`${userType}s`].getFromUserId(user.id);
      user[userType] = typeObj;
      sessionStorage.setItem('userdata', JSON.stringify(user));
      this.setState({ user }, getOpenCart);
      setTimeout(this.handleLoginClose, 500);
    } else {
      //  No user found...
      throw new Error('login failed');
    }
    return null;
  }

  redirect = () => {
    const { location, history } = this.props;
    const { user, get } = this.state;
    if (!user) return null;
    if (location.pathname === '/') {
      if (user.userType === 'employee') {
        get.orders();
        get.orderItems();
        history.push('/paintings');
      }
      if (user.userType === 'artist') history.push('/paintings');
      if (user.userType === 'customer') history.push('/gallery');
    }
    return null;
  };

  hideError = () => {
    const { handleErrorClose } = this.state;
    this.setState({ isErrorDialogVisible: false, errorMessage: '' });
    if (handleErrorClose) handleErrorClose();
  }

  hideConfirm = () => this.setState({ isConfirmDialogVisible: false, confirmObject: {} })


  /* eslint-disable-next-line */
  handleInvalidLogin = error => this.state.showError(error.message);


  render() {
    const { children } = this.props;
    const {
      isErrorDialogVisible,
      errorMessage,
      confirmObject,
      isConfirmDialogVisible,
      isLoginModalVisible,
      showError,
      showConfirm,
    } = this.state;
    return (
      <Context.Provider value={this.state}>
        {children}
        <ErrorDialog title={errorMessage} hide={this.hideError} isVisible={isErrorDialogVisible} />
        <ConfirmDialog {...confirmObject} hide={this.hideConfirm} isVisible={isConfirmDialogVisible} />
        <SelectLoginRegister
          isOpen={isLoginModalVisible}
          handleClose={this.handleLoginClose}
          showConfirm={showConfirm}
          showError={showError}
          login={this.doLogin}
          redirect={this.redirect}
        />

      </Context.Provider>
    );
  }
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};


export const ContextProvider = withRouter(Provider);


function getCartFromSessionStorage() {
  const cart = JSON.parse(sessionStorage.getItem('myCart'));
  if (!cart) return { orderItems: [] };
  return cart;
}
