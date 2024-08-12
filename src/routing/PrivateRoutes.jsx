import useDependencies from "../hooks/useDependencies";
import {Navigate, Outlet} from "react-router";

function PrivateRoutes({children}) {
  const {token, isAuthenticated} = useDependencies();

  return token || isAuthenticated ? <Outlet /> : <Navigate to='/login'/>
}

export default PrivateRoutes;
