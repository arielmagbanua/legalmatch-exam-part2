import {Navigate} from "react-router";
import {useDependencies} from "../context/Dependencies";
import {useReadLocalStorage} from "usehooks-ts";

function ProtectedRoutes({children}) {
  const {currentUser, authService} = useDependencies();
  const authUser = useReadLocalStorage('auth_user');

  console.log(currentUser);
  console.log('ProtectedRoutes')
  console.log(authUser);

  // include the local storage
  if (currentUser || authService.currentUser() || authUser) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoutes;
