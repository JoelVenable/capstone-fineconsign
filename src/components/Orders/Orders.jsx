import React, { useState, useEffect } from 'react';
import {
  Tab, Header, Table,
} from 'semantic-ui-react';
import { Consumer } from '../../ContextProvider';
import { OrderTable } from './OrderTable';
import { API } from '../../modules/api/API';


export function Orders() {
  const [activeTab, setActiveTab] = useState(0);
  const [storeAccount, setStoreAccount] = useState(null);

  const getStoreAccount = () => API.stores.get().then(setStoreAccount);


  useEffect(() => { getStoreAccount(); }, []);


  const handleChange = (_e, { activeIndex }) => {
    setActiveTab(activeIndex);
    getStoreAccount();
  };

  const panes = [
    {
      menuItem: 'Submitted',
      render: () => (
        <Tab.Pane>
          <Consumer>
            {({ orders }) => (
              <OrderTable ordersList={
              orders.filter(item => item.isSubmitted && !item.isCompleted && !item.isCancelled)
              }
              />
            )}
          </Consumer>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Completed',
      render: () => (
        <Tab.Pane>
          <Consumer>
            {({ orders }) => <OrderTable ordersList={orders.filter(item => item.isCompleted && !item.isCancelled)} />}
          </Consumer>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Cancelled',
      render: () => (
        <Tab.Pane>
          <Consumer>
            {({ orders }) => <OrderTable ordersList={orders.filter(item => item.isCancelled)} />}
          </Consumer>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      {storeAccount ? (
        <Table celled unstackable>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as="h4" content="Store account balance: " />

              </Table.Cell>
              <Table.Cell>
                <Header as="h4" content={`$${storeAccount.accountBalance}`} />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      ) : null}
      <Tab
        activeIndex={activeTab}
        onTabChange={handleChange}
        panes={panes}
      />
    </>
  );
}
