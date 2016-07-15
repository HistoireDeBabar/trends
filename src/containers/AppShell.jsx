// Define the application shell
import React, { PropTypes } from 'react';
import Header from '../components/Header.jsx';
import SearchBar from './Search.jsx';

const AppShell = ({ children }) => {
  const appStyle = {
    width: '80%',
    margin: 'auto',
    textAlign: 'justify',
    color: 'grey',
  };
  return (
	<div>
      <Header title='Trends' >
      <SearchBar />
      </Header>
      <div style={ appStyle }>
      {children}
      </div>
	</div>
  );
};

AppShell.propTypes = {
  children: PropTypes.element,
};

export default AppShell;

