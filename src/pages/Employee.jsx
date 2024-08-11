import {useNavigate, useParams} from "react-router";
import TextField from "../components/TextField";
import DateField from "../components/DateField";
import {useContext, useEffect, useState} from "react";
import DependenciesContext from "../context/Dependencies";
import {MdDeleteForever} from "react-icons/md";
import RoundIconButton from "../components/RoundIconButton";
import {IoMdSave} from "react-icons/io";
import {useSnackbar} from "notistack";

function Employee() {
  const {id} = useParams();
  const [employee, setEmployee] = useState({});

  const {enqueueSnackbar} = useSnackbar();
  const {employeeService} = useContext(DependenciesContext);
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
        console.log(res);
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
          console.log(res);
          enqueueSnackbar('The new user was added successfully!');

          // navigate back to previous route
          navigate('/employees');
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar('Something went wrong!');
        })
    }
  }

  return (
    <main className="employee grid grid-cols-1 m-6 mx-24">
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
            value={employee.firstName}
            required
            onChange={(value) => handleBasicInfoChange('firstName', value)}
          />
          <TextField
            id="middle-name"
            value={employee.middleName}
            placeholder="Middle Name"
            onChange={(value) => handleBasicInfoChange('middleName', value)}
          />
          <TextField
            id="last-name"
            placeholder="Last Name"
            value={employee.lastName}
            required
            onChange={(value) => handleBasicInfoChange('lastName', value)}
          />
          <DateField
            id="birt-date"
            value={employee.birthDate}
            placeholder="Birth Date"
            required
            onChange={(value) => handleBasicInfoChange('birthDate', value)}
          />
          <TextField
            id="gender"
            value={employee.gender}
            placeholder="Gender"
            onChange={(value) => handleBasicInfoChange('gender', value)}
          />
          <TextField
            id="marital-status"
            value={employee.maritalStatus}
            placeholder="Marital Status"
            onChange={(value) => handleBasicInfoChange('maritalStatus', value)}
          />
          <TextField
            id="position"
            value={employee.position}
            placeholder="Position"
            onChange={(value) => handleBasicInfoChange('position', value)}
          />
          <DateField
            id="date-hired"
            type="date"
            value={employee.dateHired}
            placeholder="Date Hired"
            required
            onChange={(value) => handleBasicInfoChange('dateHired', value)}
          />
        </section>
        <section className="employee__others flex flex-col gro pt-4">
          <div className="employee__others__contact flex flex-col items-start justify-center">
            <p className="text-xl py-1.5">Contact Info: </p>
            <div className="flex flex-col items-start justify-center">
              <TextField placeholder="Phone Number"/>
              <TextField placeholder="Phone Number"/>
            </div>
          </div>

          <div className="employee__others__address flex flex-col items-start justify-center">
            <p className="text-xl">Address Info: </p>
            <div className="flex flex-col items-start justify-center">
              <div className="flex items-center justify-center">
                <TextField placeholder="Address Line 1"/>
                <TextField placeholder="Address Line 2"/>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Employee;

