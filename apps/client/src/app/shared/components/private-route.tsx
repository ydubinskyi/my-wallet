import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';

function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export { PrivateRoute };
