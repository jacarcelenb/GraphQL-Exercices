import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({auth, children }) => {

	return auth ? children : <Navigate to='/' />;
};
  export default PrivateRoute

