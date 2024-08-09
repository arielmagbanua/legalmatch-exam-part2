import Employee from "../models/Employee";
import axios from "axios";

// TODO: transfer this to configuration
const API_URL = "http://localhost:3001";

interface EmployeesRepository {
  all(): Promise<any[]>;
}

class EmployeesRepositoryImplementation implements EmployeesRepository{
  async all(): Promise<any[]> {
    const response = await axios.get(`${API_URL}/employees`);

    return response.data;
  }
}

export type {EmployeesRepository}
export default EmployeesRepositoryImplementation;
