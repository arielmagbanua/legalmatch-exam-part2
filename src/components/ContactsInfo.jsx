import TextField from "./TextField";
import classNames from "classnames";
import DeletableCheckbox from "./DeletableCheckbox";
import {useEffect, useState} from "react";

function ContactsInfo({className, contacts, onContactsChange}) {
  const [contactNumbers, setContactNumbers] = useState(contacts);

  useEffect(() => {
    setContactNumbers(contacts);
  }, [contacts]);

  const classes = classNames(
    'flex flex-col items-start justify-center',
    className
  );

  const handlePrimaryCheckClick = (id, value) => {
    if (value) {
      // user wants to select a contact as primary
      const updatedNumbers = contactNumbers.map((contactNumber) => {
        let checkValue = false; // unselect all
        if (contactNumber.id === id) {
          checkValue = value;
        }

        return {...contactNumber, primary: checkValue};
      });

      setContactNumbers(updatedNumbers);
      onContactsChange(updatedNumbers)
    } else {
      const updatedNumbers = contactNumbers.map((contactNumber) => {
        if (contactNumber.id === id) {
          return {...contactNumber, primary: value};
        }

        return {...contactNumber};
      });

      setContactNumbers(updatedNumbers);
      onContactsChange(updatedNumbers)
    }
  }

  const handleDeleteContactClick = (id) => {
    const updatedNumbers = contactNumbers.filter(
      (contactNumber) => contactNumber.id !== id
    );

    setContactNumbers(updatedNumbers);
    onContactsChange(updatedNumbers);
  }

  const handleContactNumberChange = (id, value) => {
    const updatedNumbers = contactNumbers.map((contactNumber) => {
      if (contactNumber.id === id) {
        return {...contactNumber, number: value};
      }

      return contactNumber;
    });

    onContactsChange(updatedNumbers);
  }

  const renderedContacts = contactNumbers ? contactNumbers.map((contact) => {
    return (
      <DeletableCheckbox
        key={contact.id}
        defaultChecked={contact.primary}
        checked={contact.primary}
        onCheck={(e) => handlePrimaryCheckClick(contact.id, e.target.checked)}
        onDelete={(_) => handleDeleteContactClick(contact.id)}
      >
        <TextField
          placeholder="Phone Number"
          value={contact.number}
          onChange={(value) => handleContactNumberChange(contact.id, value)}/>
      </DeletableCheckbox>
    );
  }) : null;

  return (
    <div className={classes}>
      <p className="text-xl py-1.5">Contact Info: </p>
      <div className="flex flex-col items-start justify-center">
        {renderedContacts}
      </div>
    </div>
  );
}

export default ContactsInfo;
