import Employee from "../models/Employee";

interface EmployeesRepository {
  all(): Promise<Employee[]>;
}

class EmployeeRepositoryImplementation implements EmployeesRepository{
  all(): Promise<Employee[]> {
    return Promise.resolve([]);
  }
}

export type {EmployeesRepository}
export default EmployeeRepositoryImplementation;