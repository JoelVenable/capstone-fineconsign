import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
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


// export function PaintingList({ history }) {
//   const panes = [
//     {
//       menuItem: 'Submitted',
//       render: () => (
//         <Tab.Pane>
//           <Consumer>
//             {({ orders, user }) => (
//               <PaintingTable
//                 user={user}
//                 tableType="pending"
//                 history={history}
//                 paintingList={orders.filter(
//                   ({ isLive, isSold }) => !isLive && !isSold,
//                 )}
//               />
//             )}
//           </Consumer>
//         </Tab.Pane>
//       ),
//     },
//     {
//       menuItem: 'Active',
//       render: () => (
//         <Tab.Pane>
//           <Consumer>
//             {({ paintings, user }) => (
//               <PaintingTable
//                 tableType="active"
//                 user={user}
//                 history={history}
//                 paintingList={paintings.filter(
//                   ({ isLive, isSold }) => isLive && !isSold,
//                 )}
//               />
//             )}
//           </Consumer>
//         </Tab.Pane>
//       ),
//     },
//     {
//       menuItem: 'Sold',
//       render: () => (
//         <Tab.Pane>
//           <Consumer>
//             {({ paintings, user }) => (
//               <PaintingTable
//                 tableType="sold"
//                 user={user}
//                 history={history}

//                 paintingList={paintings.filter(
//                   ({ isLive, isSold }) => !isLive && isSold,
//                 )}
//               />
//             )}
//           </Consumer>
//         </Tab.Pane>
//       ),
//     },
//     {
//       menuItem: 'Add Painting',
//       render: () => (
//         <Tab.Pane>
//           <Consumer>
//             {context => (
//               <AddPainting
//                 setActiveTab={setActiveTab}
//                 {...context}
//               />
//             )}
//           </Consumer>
//         </Tab.Pane>
//       ),
//     },
//   ];

//   // function handleChange(e, { activeIndex }) {
//   //   setActiveTab(activeIndex);
//   // }


// }

// PaintingList.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }).isRequired,
// };
