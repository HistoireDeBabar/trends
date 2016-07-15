import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import Tweet from '../../src/components/Tweet.jsx';

describe('Tweet:Components', () => {
  it('returns a component with the data given', () => {
    const id = 1;
    const data = {
      user: {
        screen_name: 'TwitterUser',
      },
      text: 'Micro Blogging at its finest',
    };
    const wrapper = shallow(<Tweet key={id} tweet={data} />);
    expect(wrapper.contains(<h6 className='tweet__username'>TwitterUser</h6>)).to.equal(true);
    expect(wrapper.contains(<p className='tweet__text'>Micro Blogging at its finest</p>)).to.equal(true);
    expect(wrapper.hasClass('tweet')).to.eql(true);
  });
  it('wont break if a user is empty/undefined', () => {
    const id = 1;
    const data = {
      text: 'Micro Blogging at its finest',
    };
    const wrapper = shallow(<Tweet key={id} tweet={data} />);
    expect(wrapper.contains(<h6 className='tweet__username'>UnknownUser</h6>)).to.equal(true);
    expect(wrapper.contains(<p className='tweet__text'>Micro Blogging at its finest</p>)).to.equal(true);
    expect(wrapper.hasClass('tweet')).to.eql(true);
  });
  it('returns an empty div when no tweet is provided', () => {
    const id = 1;
    const wrapper = shallow(<Tweet key={id} />);
    expect(wrapper.contains(<div></div>)).to.equal(true);
    expect(wrapper.hasClass('tweet')).to.eql(false);
  });
});
