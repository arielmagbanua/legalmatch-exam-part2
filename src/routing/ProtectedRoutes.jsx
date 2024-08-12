import {Navigate} from "react-router";
import {useDependencies} from "../context/Dependencies";

function ProtectedRoutes({children}) {
  const {user} = useDependencies();
  return children;
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoutes;
