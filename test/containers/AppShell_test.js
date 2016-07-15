import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import AppShell from '../../src/containers/AppShell.jsx';
import Header from '../../src/components/Header.jsx';

describe('AppShell:Containers', () => {
  it('Renders a header and children', () => {
    const wrapper = shallow(<AppShell />);
    expect(wrapper.find(Header)).to.have.length(1);
  });
});
