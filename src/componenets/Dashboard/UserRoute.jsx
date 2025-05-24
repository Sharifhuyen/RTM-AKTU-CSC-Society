import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Firebase/AuthContext';

const UserRoute = ({ children }) => {
    const { user, dbUser, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="text-center mt-10 text-lg">Loading...</div>; // Or a spinner
    }

    if (!user || !dbUser || dbUser.role !== 'user') {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default UserRoute;
