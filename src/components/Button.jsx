import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ children, type = 'button', ...props }) => {
  return (
    <button
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
};