import {createContext, ReactNode} from "react";
import EmployeeService from "../services/EmployeeService";
import EmployeesRepositoryImplementation from "../repositories/EmployeesRepository";

// @ts-ignore
const DependenciesContext = createContext();

function Provider({ children }: { children: ReactNode }) {

  const dependencies = {
    employeeService: new EmployeeService(new EmployeesRepositoryImplementation()),
  }
  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  );
}

export {Provider};
export default DependenciesContext;

