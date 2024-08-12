import {useEffect, useState} from "react";
import classNames from "classnames";
import TextField from "./TextField";
import DeletableCheckbox from "./DeletableCheckbox";
import {enqueueSnackbar} from "notistack";
import uniqid from "uniqid";
import {IoMdAddCircle} from "react-icons/io";

function AddressInfo({className, addresses, onAddressesChange}) {
  const [addressList, setAddressList] = useState(addresses);

  useEffect(() => {
    if (!addresses) {
      // this means user is adding a user, so initialized the list with one primary empty address
      setAddressList([
        {
          id: uniqid('address-'),
          line1: '',
          line2: '',
          primary: true
        }
      ]);

      return;
    }

    setAddressList(addresses);
  }, [addresses]);

  const classes = classNames(
    'flex flex-col items-start justify-center',
    className
  );

  const handlePrimaryCheckClick = (id, value) => {
    if (value) {
      const updatedAddresses = addressList.map((address) => {
        let checkValue = false; // unselect all
        if (address.id === id) {
          checkValue = value;
        }

        return {...address, primary: checkValue};
      });

      setAddressList(updatedAddresses);
      onAddressesChange(updatedAddresses)
    } else {
      const updatedAddresses = addressList.map((address) => {
        if (address.id === id) {
          return {...address, primary: value};
        }

        return {...address};
      });

      setAddressList(updatedAddresses);
      onAddressesChange(updatedAddresses);
    }
  }

  const handleDeleteContactClick = (id) => {
    const addressToDelete = addressList.filter((address) => address.id === id)[0];
    if (addressToDelete.primary) {
      // prevent deletion of primary contact
      enqueueSnackbar('Deletion of primary address is not allowed.');
      return;
    }

    const updatedAddresses = addressList.filter(
      (address) => address.id !== id
    );

    setAddressList(updatedAddresses);
    onAddressesChange(updatedAddresses);
  }

  const handleLine1Change = (id, value) => {
    const updatedAddresses = addressList.map((address) => {
        if (address.id === id) {
          return {...address, line1: value};
        }

        return address;
      });

    setAddressList(updatedAddresses);
    onAddressesChange(updatedAddresses);
  }

  const handleLine2Change = (id, value) => {
    const updatedAddresses = addressList.map((address) => {
        if (address.id === id) {
          return {...address, line2: value};
        }

        return address;
      });

    setAddressList(updatedAddresses);
    onAddressesChange(updatedAddresses);
  }

  const handleAddAddressClick = () => {
    const newAddress = {
      id: uniqid('address-'),
          line1: '',
          line2: '',
    };

    const updatedAddresses = [...addressList, newAddress];
    setAddressList(updatedAddresses);
    onAddressesChange(updatedAddresses);
  }

  const renderAddress = (id, line1, line2, checked) => {
    const addressId = id || uniqid('address-');

    return (
      <DeletableCheckbox
        key={addressId}
        defaultChecked={checked}
        checked={checked}
        onCheck={(e) => handlePrimaryCheckClick(addressId, e.target.checked)}
        onDelete={(_) => handleDeleteContactClick(addressId)}
      >
        <div className="flex items-start justify-center">
          <TextField
            placeholder="Address Line 1"
            value={line1}
            onChange={(value) => handleLine1Change(addressId, value)}/>

          <TextField
            placeholder="Address Line 2"
            value={line2}
            onChange={(value) => handleLine2Change(addressId, value)}/>
        </div>
      </DeletableCheckbox>
    );
  }

  const renderedAddress = addressList ? addressList.map((address) => {
    return (
      renderAddress(address.id, address.line1, address.line2, address.primary)
    );
  }) : renderAddress(null, '', '', true); // create one empty address

  return (
    <div className={classes}>
      <div className="flex items-center justify-center">
        <p className="text-xl py-1.5">Address Info</p>
        <IoMdAddCircle className="ml-2 text-3xl text-green-500 cursor-pointer" onClick={handleAddAddressClick}/>
      </div>

      <div className="flex flex-col items-start justify-center">
        {renderedAddress}
      </div>
    </div>
  );
}

export default AddressInfo;