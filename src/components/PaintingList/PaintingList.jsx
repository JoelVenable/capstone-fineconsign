import React from 'react';
import { Tab } from 'semantic-ui-react';
import { Consumer } from '../../ContextProvider';
import { PaintingTable } from './PaintingTable';
import { AddPainting } from './AddPainting';


const panes = [
  {
    menuItem: 'Pending',
    render: () => (
      <Tab.Pane>
        <Consumer>
          {({ paintings }) => (
            <PaintingTable
              tableType="pending"
              paintingList={paintings.filter(
                ({ isSubmitted, isLive, isSold }) => isSubmitted && !isLive && !isSold,
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
          {({ paintings }) => (
            <PaintingTable
              tableType="active"
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
          {({ paintings }) => (
            <PaintingTable
              tableType="sold"
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
        <AddPainting />
      </Tab.Pane>
    ),
  },
];

export function PaintingList(props) {
  return (
    <Tab defaultActiveIndex="3" panes={panes} />
  );
}
