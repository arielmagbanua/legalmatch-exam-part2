import TextField from "./TextField";
import classNames from "classnames";
import DeletableCheckbox from "./DeletableCheckbox";
import {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import uniqid from "uniqid";
import {IoMdAddCircle} from "react-icons/io";

function ContactsInfo({className, contacts, onContactsChange}) {
  const [contactNumbers, setContactNumbers] = useState(contacts);

  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    if (!contacts) {
      // this means user is adding a user, so initialized the list with one primary empty contact
      setContactNumbers([
        {
          id: uniqid('contact-'),
          number: '',
          primary: true
        }
      ]);
      return;
    }

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
      onContactsChange(updatedNumbers);
    }
  }

  const handleDeleteContactClick = (id) => {
    const contactToDelete = contactNumbers.filter(
      (contactNumber) => contactNumber.id === id
    )[0];
    if (contactToDelete.primary) {
      // prevent deletion of primary contact
      enqueueSnackbar('Deletion of primary contact is not allowed.');
      return;
    }

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

  const handleAddContactClick = () => {
    const newContact = {
      id: uniqid('contact-'),
      number: ''
    }

    const updatedContacts = [...contactNumbers, newContact];

    setContactNumbers(updatedContacts);
    onContactsChange(updatedContacts);
  }

  // renders one contact entry
  const renderContactNumber = (id, number, checked) => {
    const contactId = id || uniqid('contact-');

    return (
      <DeletableCheckbox
        key={contactId}
        defaultChecked={checked}
        checked={checked}
        onCheck={(e) => handlePrimaryCheckClick(contactId, e.target.checked)}
        onDelete={(_) => handleDeleteContactClick(contactId)}
      >
        <div className="flex items-start justify-center">
          <TextField
            placeholder="Phone Number"
            label="Phone Number"
            value={number}
            onChange={(value) => handleContactNumberChange(contactId, value)}/>
        </div>
      </DeletableCheckbox>
    );
  }

  const renderedContacts = contactNumbers ? contactNumbers.map(
    (contact) => renderContactNumber(contact.id, contact.number, contact.primary)
  ) : (renderContactNumber(null, '', true));

  return (
    <div className={classes}>
      <div className="flex items-center justify-center">
        <p className="text-xl py-1.5">Contact Info</p>
        <IoMdAddCircle
          className="ml-2 text-3xl text-green-500 cursor-pointer"
          onClick={handleAddContactClick}
        />
      </div>
      <div className="flex flex-col items-start justify-center">
        {renderedContacts}
      </div>
    </div>
  );
}

export default ContactsInfo;
