// ========== PrivateRoute
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute: React.FC<any> = (props) => {
  const { children } = props;
  const accessToken = useSelector((currentState: any) => currentState.auth.accessToken);

  if (accessToken === '') {
    return <Navigate to="/auth/login" />;
  }

  return children;
};
export default PrivateRoute;
