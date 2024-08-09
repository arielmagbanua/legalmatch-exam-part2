import Contact from "./Contact";
import Address from "./Contact";

class Employee {
  id: number
  firstName: string
  middleName: string
  lastName: string
  age: number
  birthDate: string
  maritalStatus: string = "N / A"
  position: string | undefined | null = null
  dateHired: string | undefined | null = null
  contacts: Contact[] = []
  address: Address[] = []

  constructor(id: number, firstName: string, middleName: string, lastName: string, age: number, birthDate: string, maritalStatus: string = "N/A") {
    this.id = id;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.age = age;
    this.birthDate = birthDate;
    this.maritalStatus = maritalStatus;
  }
}

export default Employee;
