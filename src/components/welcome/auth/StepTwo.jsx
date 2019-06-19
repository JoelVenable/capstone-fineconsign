import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Message, Icon, Button,
} from 'semantic-ui-react';
import { Consumer } from '../../../ContextProvider';


export function StepTwo({
  firstName,
  lastName,
  address,
  city,
  state,
  zipcode,
  handleFieldChange,
  handleStepTwoSubmit,
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  return (
    <>
      <Form
      // warning={warning}
        success={success}
      // error={error}
        size="tiny"
        loading={loading}
      >
        <Form.Group widths="equal">
          <Form.Input
            placeholder="First Name"
            value={firstName}
            id="firstName"
            onChange={handleFieldChange}
          />
          <Form.Input
            placeholder="Last Name"
            value={lastName}
            id="lastName"
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            placeholder="Your street address"
            value={address}
            id="address"
            onChange={handleFieldChange}
          />
          <Form.Input
            placeholder="Your city"
            value={city}
            id="city"
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            placeholder="State"
            value={state}
            id="state"
            onChange={handleFieldChange}
          />
          <Form.Input
            placeholder="zipcode"
            value={zipcode}
            id="zipcode"
            onChange={handleFieldChange}
          />
        </Form.Group>

        {/*

        <Message
          size="mini"
          error
          header="Username is already taken!"
          icon="cancel"
        /> */}
        <Message
          size="mini"
          success
          header="Success!"
          icon="check"
        />

        <Consumer>
          {({ showError, history }) => (
            <Button
              type="submit"
              variant="contained"
              color="blue"
              style={{ float: 'right' }}
              icon
              labelPosition="left"
              onClick={(e) => {
                e.preventDefault();
                setLoading(true);
                handleStepTwoSubmit()
                  .then(() => {
                    setSuccess(true);
                    setTimeout(() => history.push('/gallery'), 1200);
                  });
              }}
            >
                   Register
              <Icon name="plus" />
            </Button>
          )}
        </Consumer>
      </Form>
    </>
  );
}


StepTwo.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zipcode: PropTypes.string.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleStepTwoSubmit: PropTypes.func.isRequired,
};

/* Form fields needed:

firstName        CA
lastName         CA
address          CA
city             CA
state            CA
zipcode          CA
accountBalance   CA


*/

// "employees": [
//   {
//     "id": 1,
//     "userId": 1,
//     "canEditInventory": true,
//     "canProcessOrders": true,
//     "canDefinePriceAdjustments": true,
//     "canEditEmployees": true,
//     "canEditUsers": true
//   }


// artists
// {
//   "id": 1,
//   "userId": 2,
//   "firstName": "Eldon",
//   "lastName": "Pitkaithly",
//   "artistDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis ex tristique, blandit nisi a, mollis velit. Vivamus euismod viverra risus, eget aliquet quam suscipit et. Sed et lectus sed urna faucibus ornare nec vel nunc. Donec fermentum tortor nisl. Sed efficitur pharetra lacus eu finibus. In a nisl odio. Ut non lacus lectus. Vestibulum tempor nunc in eleifend elementum. Aliquam sit amet sagittis libero. Proin purus ligula, placerat eget vulputate a, sollicitudin a nisi.\n\nPraesent at sapien interdum, tincidunt dui quis, accumsan quam. Integer laoreet nunc vel convallis viverra. Duis arcu odio, posuere non leo quis, convallis venenatis tortor. Donec odio nisl, pharetra ornare elementum at, viverra vitae augue. Aliquam non libero nec leo porta eleifend. Praesent id lobortis odio, eu consectetur felis. Mauris fringilla tempor leo, nec semper libero elementum sit amet.\n\nCurabitur dictum, urna non aliquet gravida, lectus dui porta erat, ac consectetur quam nisi ac nisi. Fusce accumsan massa non erat bibendum molestie ac vel purus. Sed dolor justo, blandit at arcu a, sollicitudin pretium ante. Nunc molestie est quis mi facilisis faucibus. Sed consectetur dignissim risus, nec fringilla lectus lacinia at. Pellentesque ut gravida lectus. Sed imperdiet nibh et blandit rhoncus. Phasellus mollis turpis sit amet magna scelerisque, ac aliquet tortor euismod. Etiam condimentum finibus purus non tincidunt. Fusce tristique facilisis quam, in vestibulum tortor tempus eget. Phasellus turpis dui, molestie vitae lectus at, elementum volutpat dui. Praesent laoreet a eros eget tristique. Nunc blandit mauris sit amet finibus bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nNullam gravida, nisi sit amet blandit dignissim, mi lorem mollis mauris, vel ornare velit mi eget tortor. Nulla in ante non nisl bibendum pretium. Aliquam posuere arcu sem, non sollicitudin mi scelerisque tempor. Cras ut turpis nisl. Pellentesque eu risus et ante mollis ornare a a nulla. Integer id purus lorem. Aliquam a tincidunt eros.\n\nNulla vitae imperdiet orci. Mauris non risus sed elit tempor tristique. Donec venenatis ullamcorper velit, ut viverra nisi scelerisque sit amet. Aliquam eget tellus vel orci bibendum consectetur vel ac felis. Morbi sodales lorem eget ante porttitor ultrices. Vivamus ac lacus dignissim mauris lacinia ultricies. Donec bibendum mollis tortor. Fusce quis sapien sem. Suspendisse arcu erat, mollis id felis vel, ullamcorper tincidunt libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus mauris dui, commodo non imperdiet et, faucibus quis diam. Ut tincidunt faucibus lobortis. Sed blandit vehicula felis euismod viverra. Morbi fringilla, est in dignissim egestas, neque dolor facilisis libero, quis malesuada orci mauris vitae nisi.",
//   "artistImageUrl": "http://dummyimage.com/109x170.jpg/cc0000/ffffff",
//   "avatarUrl": "",
//   "profitRatio": 0.66,
//   "phoneNumber": "132-688-9893",
//   "accountBalance": 355.59,
//   "imgUrl": "https://firebasestorage.googleapis.com/v0/b/capstone-consignio.appspot.com/o/1560807402210-Pitkaithly-main?alt=media&token=2987a015-60d7-4c8f-80a7-d913e735f68e",
//   "thumbUrl": "https://firebasestorage.googleapis.com/v0/b/capstone-consignio.appspot.com/o/1560807412070-Pitkaithly-thumb?alt=media&token=73d4b020-b2af-47cf-880d-bf82132d1fd3",
//   "hometown": "Clarksville, AL"
// },
