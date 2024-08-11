import {useContext, useEffect, useState} from "react";
import DependenciesContext from "../context/Dependencies";
import DataTable from 'react-data-table-component';
import getYearDifference from "../utils/dates";
import Header from "../components/Header";
import RoundIconButton from "../components/RoundIconButton";
import {MdDeleteForever, MdEditSquare} from "react-icons/md";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const {employeeService} = useContext(DependenciesContext);

  useEffect(() => {
    const fetchEmployees = async () => {
      return await employeeService.all();
    }

    fetchEmployees().then((data) => setEmployees(data));
  }, [employeeService]);

  const handleEditClick = (employee) => {
    // TODO: redirect to edit screen
  }

  const handleDeleteClick = (id) => {
    // TODO: delete employee
  }

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
    },
    {
      name: '',
      selector: (row) => {
        return (
          <div className="flex items-center justify-center">
            <RoundIconButton
              className="bg-green-400 my-4"
              icon={<MdEditSquare/>}
              onClick={() => handleEditClick(row)}
            />
            <RoundIconButton
              className="bg-red-400 my-4"
              icon={<MdDeleteForever/>}
              onClick={() => handleDeleteClick(row.id)}
            />
          </div>
        );
      }
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
