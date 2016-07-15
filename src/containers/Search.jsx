import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import fetchTweets from '../actions/search.js';

const inputStyle = {
  color: 'white',
  borderBottom: '1px white solid',
};
const searchStyle = {
  color: 'white',
};

export const Search = ({ dispatch }) => {
  let input;
  return (
    <form onSubmit={ e => {
      e.preventDefault();
      if (!input.value.trim()) {
        return;
      }
      dispatch(fetchTweets(input.value));
      input.value = '';
    }}>
    <input style={ inputStyle } ref={node => { input = node; }} placeholder='#...'/>
    <button style={ searchStyle } type='submit'>search</button>
    </form>
  );
};

Search.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(Search);
