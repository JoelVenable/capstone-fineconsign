import React from 'react';
import { shallow } from 'enzyme';
import { ApplicationViews } from './ApplicationViews';


describe('<ApplicationViews />', () => {
  it('renders <ApplicationViews /> without crashing', () => {
    const wrapper = shallow(<ApplicationViews />);
    expect(wrapper.length).toEqual(1);
  });
});
