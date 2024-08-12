import {Navigate} from "react-router";
import {useDependencies} from "../context/Dependencies";

function ProtectedRoutes({children}) {
  const {currentUser, authService} = useDependencies();

  if (currentUser || authService.currentUser()) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoutes;
