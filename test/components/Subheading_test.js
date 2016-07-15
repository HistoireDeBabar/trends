import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import SubHeading from '../../src/components/Subheading.jsx';

describe('Subheading:Components', () => {
  it('Displays the given title', () => {
    const heading = '#';
    const wrapper = shallow(<SubHeading heading={ heading } />);
    expect(wrapper.contains(<h2 className='subheading'>#</h2>)).to.eql(true);
  });
});
