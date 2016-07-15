import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import React from 'react';
import { Search } from '../../src/containers/Search.jsx';

describe('Search:Containers', () => {
  describe('Search', () => {
    it('populates the input box with the current trend', () => {
      const wrapper = shallow(<Search />);
      expect(wrapper.find('form')).to.have.length(1);
      expect(wrapper.find('input')).to.have.length(1);
      expect(wrapper.find('button')).to.have.length(1);
    });
    it('calls dispatch with the correct action on submit', () => {
      const actions = [];
      const mockDispatch = (action) => {
        actions.push(action);
      };
      const wrapper = mount(<Search dispatch={ mockDispatch } />);
      const input = wrapper.find('input');
      input.node.value = 'CatMemes';
      input.simulate('change', input);
      wrapper.find('form').simulate('submit', { preventDefault: () => {} });
      expect(actions[0]).to.be.a('function');
    });
    it('wont dispatch action with an empty string', () => {
      const actions = [];
      const mockDispatch = (action) => {
        actions.push(action);
      };
      const wrapper = mount(<Search dispatch={ mockDispatch } />);
      wrapper.find('form').simulate('submit', { preventDefault: () => {} });
      expect(actions).to.have.length(0);
    });
  });
});
