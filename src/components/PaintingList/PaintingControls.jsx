import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../ContextProvider';
import { EditButton } from '../utility/EditButton';
import { SendForReviewButton } from '../utility/SendForReviewButton';
import { OrderButton } from '../utility/OrderButton';
import { DeactivateButton } from '../utility/DeactivateButton';
import { KickbackButton } from '../utility/KickbackButton';
import { GoLiveButton } from '../utility/GoLiveButton';


export function PaintingControls({ id }) {
  return (
    <Consumer>
      {({
        user, paintings, history, orders, orderItems,
      }) => {
        const {
          isSold, isLive, isSubmitted, isPendingSale,
        } = paintings.find(item => item.id === id);
        if (user) {
          if (user.userType === 'artist') {
            if (isSold || isLive || isSubmitted || isPendingSale) return null;
            return (
              <div className="table-actionIconContainer">
                <EditButton id={id} history={history} />
                <SendForReviewButton id={id} />
              </div>
            );
          }

          if (user.userType === 'employee') {
            if (isSold || isPendingSale) {
            //  find all order items containing the painting
              const orderId = orderItems.filter(item => item.paintingId === id)

              //  then make an orders array from values referenced in the orderItems table
                .map(item => orders.find(order => order.id === item.orderId))

              //  then find the order that triggered the current 'isPendingSale' flag.
                .find(item => item.isSubmitted && !item.isRejected)
                .id;

              return (
                <div className="table-actionIconContainer">

                  <OrderButton id={orderId} history={history} />


                </div>
              );
            }
            if (isLive) {
              return (
                <div className="table-actionIconContainer">
                  <DeactivateButton id={id} />
                  <EditButton id={id} history={history} />
                </div>
              );
            }
            if (isSubmitted) {
              return (
                <div className="table-actionIconContainer">
                  <KickbackButton id={id} />
                  <EditButton id={id} history={history} />
                  <GoLiveButton id={id} />
                </div>
              );
            }
          }
        }
        return null;
      }}
    </Consumer>
  );
}


PaintingControls.propTypes = {
  id: PropTypes.number.isRequired,
};
