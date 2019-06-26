import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import { Consumer } from '../../ContextProvider';
import { OrderTable } from './OrderTable';


export function Orders() {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (_e, { activeIndex }) => {
    setActiveTab(activeIndex);
  };

  const panes = [
    {
      menuItem: 'Submitted',
      render: () => (
        <Tab.Pane>
          <Consumer>
            {({ orders }) => <OrderTable ordersList={orders.filter(item => item.isSubmitted && !item.isCompleted)} />}
          </Consumer>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Completed',
      render: () => (
        <Tab.Pane>
          <Consumer>
            {({ orders }) => <OrderTable ordersList={orders.filter(item => item.isCompleted)} />}
          </Consumer>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Tab
      activeIndex={activeTab}
      onTabChange={handleChange}
      panes={panes}
    />
  );
}
