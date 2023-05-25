import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {

    const useAuth = () => {
        return {user:true};
    }

    let auth = useAuth(); // Votre logique d'authentification va ici.
    let location = useLocation();

    if (!auth.user) {
        return <Navigate to={{pathname: '/', state: { from: location }}} />
    }


    return children;
}

export default PrivateRoute;