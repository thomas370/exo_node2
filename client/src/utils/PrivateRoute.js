import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {
    const location = useLocation();

    const isLoggedIn = localStorage.getItem('id');

    if (!isLoggedIn) {
        return <Navigate to="/" state={{ from: location }} />
    }else {
        return children;
    }
}

export default PrivateRoute;
