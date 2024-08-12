import {useEffect, useState} from "react";
import DataTable from 'react-data-table-component';
import getYearDifference from "../utils/dates";
import RoundIconButton from "../components/RoundIconButton";
import {MdDeleteForever, MdEditSquare} from "react-icons/md";
import {IoMdPersonAdd} from "react-icons/io";
import RoundIconLink from "../components/RoundIconLink";
import {useSnackbar} from "notistack";
import {useDependencies} from "../context/Dependencies";
import classNames from "classnames";

function Employees() {
  const [employees, setEmployees] = useState([]);

  const {enqueueSnackbar} = useSnackbar();
  const {employeeService} = useDependencies();

  useEffect(() => {
    return employeeService.allRealtime((snapshot) => {
      const employees = []
      snapshot.forEach((doc) => employees.push({...doc.data(), id: doc.id}));

      console.log('Employees - useEffect()');
      setEmployees(employees);
    });
  }, [employeeService]);

  const handleDeleteClick = (id) => {
    // remove from front-end
    const updatedEmployees = employees.filter((employee) => employee.id !== id);

    employeeService.delete(id)
      .then((res) => {
        console.log(res);
        enqueueSnackbar('The new user was deleted successfully!');
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Something went wrong!');
      });

    setEmployees(updatedEmployees);
  }

  const columns = [
    {
      name: 'Name',
      sortable: true,
      selector: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      name: 'Address',
      sortable: true,
      selector: (row) => {
        if (!row.addresses) {
          return '';
        }

        const primaryAddress = row.addresses.filter((address) => address.primary)[0];
        return `${primaryAddress.line1} ${primaryAddress.line2}`;
      }
    },
    {
      name: 'Phone Number',
      sortable: true,
      selector: (row) => {
        if (!row.contacts) {
          return '';
        }

        const primaryContact = row.contacts.filter((contact) => contact.primary)[0];
        return primaryContact.number;
      }
    },
    {
      name: 'Age',
      sortable: true,
      selector: row => row.age
    },
    {
      name: 'Years in the Company',
      sortable: true,
      selector: (row) => getYearDifference(new Date(row.dateHired))
    },
    {
      name: '',
      selector: (row) => {
        return (
          <div className="flex items-center justify-center">
            <RoundIconLink
              className="bg-green-400 my-4"
              icon={<MdEditSquare/>}
              to={`/employees/${row.id}`}
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

  const mainClasses = classNames(
    'px-32 flex flex-col flex-nowrap pt-[96px]',
    '2xl:px-32 2xl:pt-[96px]',
    'lg:px-24',
    'md:px-12',
    'sm:px-8',
    'xs:px-4',
    'xxs:px-4',
    '2xxs:px-4'
  );

  return (
    <main className={mainClasses}>
      <section className="employees-table">
        <div className="controls flex items-start justify-start">
          <RoundIconLink
            className="bg-green-400 my-4"
            icon={<IoMdPersonAdd/>}
            to={`/employees/add`}
          />
        </div>
        <DataTable
          columns={columns}
          data={employees}
          pagination
        />
      </section>
    </main>
  )
}

export default Employees;
