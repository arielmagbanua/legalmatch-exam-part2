import {createContext, PropsWithChildren, useContext, useState} from "react";
import EmployeeService from "../services/EmployeeService";
import EmployeesRepositoryImplementation from "../repositories/EmployeesRepository";

// @ts-ignore
const DependenciesContext = createContext();

type DependenciesProviderProps = PropsWithChildren;

function Provider({ children }: DependenciesProviderProps) {
  const [user, setUser] = useState(null);

  console.log('deps');
  console.log(user);

  const dependencies = {
    employeeService: new EmployeeService(new EmployeesRepositoryImplementation()),
    user,
    setUser
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
