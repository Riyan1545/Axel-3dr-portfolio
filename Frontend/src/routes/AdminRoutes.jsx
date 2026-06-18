import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {

    const user = JSON.parse(
        localStorage.getItem('user')
    );

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!user.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;