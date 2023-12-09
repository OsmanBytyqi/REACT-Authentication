import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
    let auth = { token: sessionStorage.getItem("role") };
    return auth.token ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoutes;
