import React, { useContext, useState } from 'react';
import { Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Context } from '../../ContextProvider';
import { PaintingTable } from './PaintingTable';
import { AddPainting } from './AddPainting';

export function PaintingList({ history }) {
  const [activeTab, setActiveTab] = useState(0);
  const { paintings, user } = useContext(Context);

  const handleChange = (_e, { activeIndex }) => {
    setActiveTab(activeIndex);
  };
  const panes = [
    {
      menuItem: 'Drafts',
      render: () => (
        <Tab.Pane>
          {paintings ? (
            <PaintingTable
              user={user}
              tableType="pending"
              history={history}
              paintingList={paintings.filter(
                ({ isLive, isPendingSale, isSold }) =>
                  !isLive && !isPendingSale && !isSold,
              )}
            />
          ) : null}
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Active',
      render: () => (
        <Tab.Pane>
          <PaintingTable
            tableType="active"
            user={user}
            history={history}
            paintingList={paintings.filter(
              ({ isLive, isSold, isPendingSale }) =>
                isLive && !isSold && !isPendingSale,
            )}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Sold',
      render: () => (
        <Tab.Pane>
          <PaintingTable
            tableType="sold"
            user={user}
            history={history}
            paintingList={paintings.filter(
              ({ isLive, isSold, isPendingSale }) =>
                !isLive && (isPendingSale || isSold),
            )}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Add',
      render: () => (
        <Tab.Pane>
          <AddPainting setActiveTab={setActiveTab} />
        </Tab.Pane>
      ),
    },
  ];

  // function handleChange(e, { activeIndex }) {
  //   setActiveTab(activeIndex);
  // }

  return (
    <Tab activeIndex={activeTab} onTabChange={handleChange} panes={panes} />
  );
}

PaintingList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
