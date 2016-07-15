import React, { PropTypes } from 'react';

const bannerStyle = {
  color: 'white',
  backgroundColor: 'tomato',
  padding: '4%',
  fontWeight: '500',
  fontSize: '24px',
  fontStyle: 'normal',
  boxShadow: '1px 2px 5px grey',
  zIndex: 100,
  position: 'relative',
};

const Header = ({ title, children }) => {
  return (
    <header style={ bannerStyle } className='banner'>
    <h1 className='banner__title'>
    {title}
    </h1>
    { children }
    </header>);
};

Header.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
};

export default Header;
