import React, { PropTypes } from 'react';
const Subheading = ({ heading }) => {
  return (
    <h2 className="subheading">{ heading }</h2>
  );
};

Subheading.propTypes = {
  heading: PropTypes.string,
};

export default Subheading;
