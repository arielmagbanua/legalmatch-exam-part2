import axios from "axios";

// TODO: transfer this to configuration
const API_URL = "http://localhost:3001";

interface EmployeesRepository {
  all(): Promise<any[]>; // TODO: update the type and avoid any
  get(id: number | string): Promise<any>; // TODO: update the type and avoid any
  add(employee: any): Promise<any>; // TODO: update the type and avoid any
  update(id: number | string, updatedEmployee: any): Promise<any>; // TODO: update the type and avoid any
  delete(id: number | string): Promise<any>;
}

class EmployeesRepositoryImplementation implements EmployeesRepository{
  // TODO: update the type and avoid any
  async all(): Promise<any[]> {
    const response = await axios.get(`${API_URL}/employees`);

    return response.data;
  }

  // TODO: update the type and avoid any
  async get(id: number | string): Promise<any> {
    const response = await axios.get(`${API_URL}/employees/${id}`);

    return response.data;
  }

  // TODO: update the type and avoid any
  async add(employee: any): Promise<any> {
    const response = await axios.post(`${API_URL}/employees`, employee);

    return response.data;
  }

  async update(id: number | string, updatedEmployee: any): Promise<any> {
    const response = await axios.put(`${API_URL}/employees/${id}`, updatedEmployee);

    return response.data;
  }

  async delete(id: number | string): Promise<any> {
    const response = await axios.delete(`${API_URL}/employees/${id}`);

    return response.data;
  }
}

export type {EmployeesRepository}
export default EmployeesRepositoryImplementation;
