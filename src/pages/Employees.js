import EmployeeService from "../services/EmployeeService";

const service = new EmployeeService();

function Employees() {
  return (
    <div>{service.foo()}</div>
  )
}

export default Employees;
