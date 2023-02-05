import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, children }) => {
  if (!localStorage.getItem('uid')) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;