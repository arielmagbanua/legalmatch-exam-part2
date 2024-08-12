import {useNavigate, useParams} from "react-router";
import TextField from "../components/TextField";
import DateField from "../components/DateField";
import {useEffect, useState} from "react";
import {MdDeleteForever} from "react-icons/md";
import RoundIconButton from "../components/RoundIconButton";
import {IoMdSave} from "react-icons/io";
import {useSnackbar} from "notistack";
import ContactsInfo from "../components/ContactsInfo";
import AddressInfo from "../components/AddressInfo";
import {useDependencies} from "../context/Dependencies";

function Employee() {
  const {id} = useParams();
  const [employee, setEmployee] = useState({});

  const {enqueueSnackbar} = useSnackbar();
  const {employeeService} = useDependencies();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return; // do nothing meaning it is adding a user
    }

    const fetchEmployee = async () => {
      return employeeService.get(id)
    }

    fetchEmployee().then((fetchedEmployee) => {
      setEmployee(fetchedEmployee);
    })
  }, [employeeService, id]);

  const handleBasicInfoChange = (key, value) => {
    const updated = {
      ...employee,
      [key]: value
    }

    setEmployee(updated);
  }

  const handleDeleteClick = (id) => {
    employeeService.delete(id)
      .then((res) => {
        enqueueSnackbar('The new user was deleted successfully!');

        // navigate back to previous route
        navigate('/employees');
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Something went wrong!');
      });
  }

  const handleSaveClick = () => {
    // execute save
    if (!employee.id) {
      // this means user is new so create it
      employeeService.add(employee)
        .then((res) => {
          enqueueSnackbar('The new user was added successfully!');

          // navigate back to previous route
          navigate('/employees');
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar('Something went wrong!');
        })
    } else {
      employeeService.update(employee.id, employee)
        .then((res) => {
          enqueueSnackbar('The new user was edited successfully!');

          // navigate back to previous route
          navigate('/employees');
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar('Something went wrong!');
        })
    }
  }

  const handleContactsChange = (updatedContacts) => {
    setEmployee({
      ...employee, contacts: updatedContacts
    });
  }

  const handleAddressesChange = (updatedAddresses) => {
    setEmployee({
      ...employee, addresses: updatedAddresses
    });
  }

  return (
    <main className="employee grid grid-cols-1 p-6 px-24 pt-[96px]">
      <div className="flex items-center justify-start px-4 border-b">
        <RoundIconButton
          className="bg-green-400 my-4"
          icon={<IoMdSave/>}
          onClick={handleSaveClick}
        />
        <RoundIconButton
          className="bg-red-400 my-4"
          icon={<MdDeleteForever/>}
          onClick={() => handleDeleteClick(employee.id)}
        />
      </div>
      <div className="flex items-start justify-evenly">
        <section className="employee__basic flex flex-col mr-16 grow items-start justify-start pt-4">
          <TextField
            id="first-name"
            placeholder="First Name"
            label="First Name"
            value={employee.firstName}
            required
            onChange={(value) => handleBasicInfoChange('firstName', value)}
          />
          <TextField
            id="middle-name"
            value={employee.middleName}
            placeholder="Middle Name"
            label="Middle Name"
            onChange={(value) => handleBasicInfoChange('middleName', value)}
          />
          <TextField
            id="last-name"
            placeholder="Last Name"
            label="Last Name"
            value={employee.lastName}
            required
            onChange={(value) => handleBasicInfoChange('lastName', value)}
          />
          <DateField
            id="birt-date"
            value={employee.birthDate}
            placeholder="Birth Date"
            label="Birth Date"
            required
            max={'2010-04-23'}
            onChange={(value) => handleBasicInfoChange('birthDate', value)}
          />
          <TextField
            id="gender"
            value={employee.gender}
            placeholder="Gender"
            label="Gender"
            onChange={(value) => handleBasicInfoChange('gender', value)}
          />
          <TextField
            id="marital-status"
            value={employee.maritalStatus}
            placeholder="Marital Status"
            label="Marital Status"
            onChange={(value) => handleBasicInfoChange('maritalStatus', value)}
          />
          <TextField
            id="position"
            value={employee.position}
            placeholder="Position"
            label="Position"
            onChange={(value) => handleBasicInfoChange('position', value)}
          />
          <DateField
            id="date-hired"
            type="date"
            value={employee.dateHired}
            placeholder="Date Hired"
            label="Date Hired"
            required
            onChange={(value) => handleBasicInfoChange('dateHired', value)}
          />
        </section>
        <section className="employee__others flex flex-col gro pt-4">
          <ContactsInfo
            className="employee__others__contact mb-4"
            contacts={employee.contacts}
            onContactsChange={handleContactsChange}
          />

          <AddressInfo
            className="employee__others__address"
            addresses={employee.addresses}
            onAddressesChange={handleAddressesChange}
          />
        </section>
      </div>
    </main>
  );
}

export default Employee;

