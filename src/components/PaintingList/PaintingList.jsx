import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import { Consumer } from '../../ContextProvider';
import { PaintingTable } from './PaintingTable';
import { AddPainting } from './AddPainting';

export function PaintingList() {
  const [activeTab, setActiveTab] = useState(0);

  const panes = [
    {
      menuItem: 'Pending',
      render: () => (
        <Tab.Pane>
          <Consumer>
            {({ paintings, user }) => (
              <PaintingTable
                user={user}
                tableType="pending"
                paintingList={paintings.filter(
                  ({ isLive, isSold }) => !isLive && !isSold,
                )}
              />
            )}
          </Consumer>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Active',
      render: () => (
        <Tab.Pane>
          <Consumer>
            {({ paintings, user }) => (
              <PaintingTable
                tableType="active"
                user={user}

                paintingList={paintings.filter(
                  ({ isLive, isSold }) => isLive && !isSold,
                )}
              />
            )}
          </Consumer>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Sold',
      render: () => (
        <Tab.Pane>
          <Consumer>
            {({ paintings, user }) => (
              <PaintingTable
                tableType="sold"
                user={user}
                paintingList={paintings.filter(
                  ({ isLive, isSold }) => !isLive && isSold,
                )}
              />
            )}
          </Consumer>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Add Painting',
      render: () => (
        <Tab.Pane>
          <Consumer>
            {context => <AddPainting setActiveTab={setActiveTab} {...context} />}
          </Consumer>
        </Tab.Pane>
      ),
    },
  ];

  function handleChange(e, { activeIndex }) {
    setActiveTab(activeIndex);
  }


  return (
    <Tab
      activeIndex={activeTab}
      onTabChange={handleChange}
      panes={panes}
    />
  );
}
