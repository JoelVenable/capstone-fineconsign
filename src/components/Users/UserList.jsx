import React from 'react';
import { Tab, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { UserTable } from './UserTable';
import { ArtistTableItem } from './ArtistTableItem';
import { EmployeeTableItem } from './EmployeeTableItem';
import { CustomerTableItem } from './CustomerTableItem';
import { UserConsumer } from '../../AllUsersContext';
import { UserTableItem } from './UserTableItem';


/*

If you can see this component at all, we've already checked if you're an employee that can edit uers.

The only auth check needed here is the user.employee.canEditEmployees (superuser access) prop

*/


export function UserList({
  artists, customers, user, employees, edit,
}) {
  // const [activeTab, setActiveTab] = useState(0);

  const panes = [
    {
      menuItem: 'Artists',
      render: () => (
        <Tab.Pane>
          <UserTable>
            { artists.map(artist => <ArtistTableItem key={artist.id} artist={artist} user={user} />)}
          </UserTable>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Customers',
      render: () => (
        <Tab.Pane>
          <UserTable>
            {customers.map(customer => <CustomerTableItem key={customer.id} customer={customer} />)}
          </UserTable>
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
            { employees.map(employee => (
              <EmployeeTableItem
                key={employee.id}
                employee={employee}
                user={user}
                edit={edit}
              />
            ))}

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
            <UserConsumer>
              {context => (
                <>
                  {context.users.map(user => <UserTableItem key={user.id} user={user} {...context} />)}
                </>
              )}
            </UserConsumer>
          </UserTable>
          {/* <Consumer>
            {context => <AddPainting setActiveTab={setActiveTab} {...context} />}
          </Consumer> */}
        </Tab.Pane>
      ),
    });
  }

  // function handleChange(e, { activeIndex }) {
  //   // setActiveTab(activeIndex);
  // }


  return (
    <Tab
      // activeIndex={activeTab}
      // onTabChange={handleChange}
      panes={panes}
    >
      <Tab.Pane>
        <Menu.Item>Helllo</Menu.Item>
        <UserTable>
        Im a table
        </UserTable>
      </Tab.Pane>
    </Tab>
  );
}

UserList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  artists: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string.isRequired,
  })).isRequired,
  customers: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  employees: PropTypes.arrayOf(PropTypes.shape({
    canEditEmployees: PropTypes.bool.isRequired,
  })).isRequired,
  edit: PropTypes.shape({
    employee: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    userType: PropTypes.string.isRequired,
  }).isRequired,
};
