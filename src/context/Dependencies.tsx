import {createContext, ReactNode, useState} from "react";
import EmployeeService from "../services/EmployeeService";
import EmployeesRepositoryImplementation from "../repositories/EmployeesRepository";

// @ts-ignore
const DependenciesContext = createContext();

function Provider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(null);

  const login = (userToken: any) => {
    setToken(userToken);
  };

  const logout = () => {
    setToken(null);
  };

  const isAuthenticated = !!token;

  const dependencies = {
    employeeService: new EmployeeService(new EmployeesRepositoryImplementation()),
    login: login,
    logout: logout,
    token: token,
    isAuthenticated: isAuthenticated
  }
  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  );
}

export {Provider};
export default DependenciesContext;

