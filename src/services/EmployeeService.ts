import {EmployeesRepository} from "../repositories/EmployeesRepository";
import Employee from "../models/Employee";

class EmployeeService {
  public repo: EmployeesRepository;

  public constructor(repo: EmployeesRepository) {
      this.repo = repo;
  }

  public async all(): Promise<Employee[]> {
    return this.repo.all();
  }
}

export default EmployeeService;