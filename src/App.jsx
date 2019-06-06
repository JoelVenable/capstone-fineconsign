import React, { PureComponent } from 'react';
import { CustomTheme } from './components/utility/CustomTheme';
import { ContextWrapper } from './Context/Context';
import { ApplicationViews } from './ApplicationViews';


export class App extends PureComponent {
  render() {
    return (
      <ContextWrapper>
        <CustomTheme>
          <ApplicationViews />
        </CustomTheme>
      </ContextWrapper>
    );
  }
}
