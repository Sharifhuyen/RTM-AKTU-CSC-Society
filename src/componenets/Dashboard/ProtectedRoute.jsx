import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Firebase/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, dbUser, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div>Loading...</div>;

    if (!user || !dbUser) {
        // Not logged in or dbUser missing
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
