import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import EmployeeService from "../services/EmployeeService";
import EmployeesRepositoryImplementation from "../repositories/EmployeesRepository";
import AuthService from "../services/AuthService";
import AuthRepositoryImplementation from "../repositories/AuthRepository";
import { getAuth, onAuthStateChanged } from "firebase/auth";


// @ts-ignore
const DependenciesContext = createContext();

type DependenciesProviderProps = PropsWithChildren;

function Provider({ children }: DependenciesProviderProps) {
  const [currentUser, setCurrentUser] = useState(null);
  const [signedIn, setSignedIn] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const authService = new AuthService(new AuthRepositoryImplementation());

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUser = authService.currentUser();
        if (currentUser) {
          // set the current user
          return setCurrentUser({...currentUser});
        }
        return setCurrentUser(null);
      }
      return setCurrentUser(null);
    });
    return unsubscribe;
  }, []);

  const dependencies = {
    employeeService: new EmployeeService(new EmployeesRepositoryImplementation()),
    authService,
    currentUser,
    signedIn,
    setSignedIn
  }
  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  );
}

export {Provider};
export const useDependencies = () => {
  const context = useContext(DependenciesContext);

  if (context === undefined) {
    throw new Error('Dependencies must be used within a Provider.');
  }

  return context;
}
