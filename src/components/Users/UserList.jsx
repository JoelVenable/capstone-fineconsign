import React, { useState } from 'react';
import { Tab, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Consumer } from '../../ContextProvider';
import { UserTable } from './UserTable';
import { ArtistTableItem } from './ArtistTableItem';

/*

If you can see this component at all, we've already checked if you're an employee that can edit uers.

The only auth check needed here is the user.employee.canEditEmployees (superuser access) prop

*/


export function UserList({ history, artists, user }) {
  const [activeTab, setActiveTab] = useState(0);

  const panes = [
    {
      menuItem: 'Artists',
      render: () => (
        <Tab.Pane>
          <UserTable>
            { artists.map(artist => <ArtistTableItem key={artist.id} artist={artist} user={user} />)}
          </UserTable>
          {/* <Consumer>
            {({ artists, user }) => (
              // <UserTable
              //   user={user}
              //   tableType="artists"
              //   history={history}
              //   artistList={
              //   )}
              // />
            )}
          </Consumer> */}
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Customers',
      render: () => (
        <Tab.Pane>
          <UserTable>
            Customers
          </UserTable>
          {/* <Consumer>
            {({ paintings, user }) => (
              <PaintingTable
                tableType="active"
                user={user}
                history={history}
                paintingList={paintings.filter(
                  ({ isLive, isSold }) => isLive && !isSold,
                )}
              />
            )}
          </Consumer> */}
        </Tab.Pane>
      ),
    },
  ];


  if (user.employee.canEditEmployees) {
    panes.push({
      menuItem: 'Employees',
      render: () => (
        <Tab.Pane>
          <UserTable>
          Employees
          </UserTable>
          {/* <Consumer>
            {({ paintings, user }) => (
              <PaintingTable
                tableType="sold"
                user={user}
                history={history}

                paintingList={paintings.filter(
                  ({ isLive, isSold }) => !isLive && isSold,
                )}
              />
            )}
          </Consumer> */}
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'All Users',
      render: () => (
        <Tab.Pane>
          <UserTable>
            All Users
          </UserTable>
          {/* <Consumer>
            {context => <AddPainting setActiveTab={setActiveTab} {...context} />}
          </Consumer> */}
        </Tab.Pane>
      ),
    });
  }

  function handleChange(e, { activeIndex }) {
    setActiveTab(activeIndex);
  }


  return (
    <Tab
      // activeIndex={activeTab}
      onTabChange={handleChange}
      panes={panes}
    >
      <Tab.Pane>
        <Menu.Item>Helllo</Menu.Item>
        <UserTable>
        I'm a table
        </UserTable>
      </Tab.Pane>
    </Tab>
  );
}

UserList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
