import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({ className = '', ...props }) => {
    return (
        <input
            className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
            {...props}
        />
    );
};

Input.propTypes = {
    className: PropTypes.string,
};
