import {useContext, useEffect, useState} from "react";
import DependenciesContext from "../context/Dependencies";
import DataTable from 'react-data-table-component';
import getYearDifference from "../utils/dates";
import Header from "../components/Header";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const {employeeService} = useContext(DependenciesContext);

  useEffect(() => {
    const fetchEmployees = async () => {
      return await employeeService.all();
    }

    fetchEmployees().then((data) => setEmployees(data));
  }, [employeeService]);

  console.log(employees);

  const columns = [
    {
      name: 'Name',
      selector: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      name: 'Address',
      selector: (row) => {
        const primaryAddress = row.addresses.filter((address) => address.primary)[0];
        return `${primaryAddress.line1} ${primaryAddress.line2}`;
      }
    },
    {
      name: 'Phone Number',
      selector: (row) => {
        const primaryContact = row.contacts.filter((contact) => contact.primary)[0];
        return primaryContact.number;
      }
    },
    {
      name: 'Age',
      selector: row => row.age
    },
    {
      name: 'Years in the Company',
      selector: (row) => getYearDifference(new Date(row.dateHired))
    }
  ];

  return (
    <>
      <Header className="p-6"/>
      <section className="employees m-6 mx-32 flex flex-col flex-nowrap">
        <div className="controls flex">
          
        </div>
        <DataTable
          columns={columns}
          data={employees}
        />
      </section>
    </>
  )
}

export default Employees;
