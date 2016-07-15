import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import Header from '../../src/components/Header.jsx';

describe('Header:Components', () => {
  it('Renders a title component', () => {
    const title = 'Test';
    const wrapper = shallow(<Header title={title} />);
    expect(wrapper.hasClass('banner')).to.eql(true);
    expect(wrapper.contains(<h1 className='banner__title'>Test</h1>)).to.eql(true);
  });
});
