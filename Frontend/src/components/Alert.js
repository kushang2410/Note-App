import React from 'react';

const Alert = ({ message, type }) => {
  return (
    message && (
      <div className={`alert alert-${type} d-flex align-items-center alert-dismissible fade show mt-3`} role="alert">
        <div>{message}</div>
      </div>
    )
  );
};

export default Alert;
