import {useContext} from "react";
import DependenciesContext from "../context/Dependencies";

function Employees() {
  const {employeeService} = useContext(DependenciesContext);
  console.log(employeeService.all());
  return (
    <div className="employees">
      
    </div>
  )
}

export default Employees;
