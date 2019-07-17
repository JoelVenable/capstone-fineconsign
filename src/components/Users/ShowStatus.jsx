import React, { useContext } from 'react';
import { Popup, Label, Icon } from 'semantic-ui-react';
import { Context } from '../../ContextProvider';

export function ShowStatus() {
  const { paintings } = useContext(Context);
  const pending = paintings.filter(
    painting => painting.isSubmitted && !painting.isLive && !painting.isSold,
  ).length;
  const active = paintings.filter(
    painting => painting.isLive && !painting.isSold,
  ).length;
  const sold = paintings.filter(painting => painting.isSold).length;

  return (
    <>
      <Popup
        content={`This artist has ${pending} paintings pending approval`}
        trigger={(
          <Label color="orange">
            <Icon name="pause" />
            {pending}
          </Label>
)}
      />
      <Popup
        content={`This artist has ${active} paintings available for sale`}
        trigger={(
          <Label color="blue">
            <Icon name="bolt" />
            {active}
          </Label>
)}
      />

      <Popup
        content={`This artist has ${sold} sold paintings`}
        trigger={(
          <Label color="green">
            <Icon name="box" />
            {sold}
          </Label>
)}
      />
    </>
  );
}
