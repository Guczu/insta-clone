import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ user, children }) => {
  if (localStorage.getItem('uid')) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default PublicRoute;