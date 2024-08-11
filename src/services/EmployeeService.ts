import {EmployeesRepository} from "../repositories/EmployeesRepository";

class EmployeeService {
  public repo: EmployeesRepository;

  public constructor(repo: EmployeesRepository) {
      this.repo = repo;
  }

  // TODO: update the type and avoid any
  public async all(): Promise<any[]> {
    return this.repo.all();
  }

  public async get(id: number | string): Promise<any> {
    return this.repo.get(id);
  }

  public async add(employee: any): Promise<any> {
    await this.repo.add(employee);
  }

  public async update(id: number | string, updatedEmployee: any): Promise<any> {
    return this.repo.update(id, updatedEmployee);
  }

  public async delete(id: number | string): Promise<any> {
    await this.repo.delete(id);
  }
}

export default EmployeeService;