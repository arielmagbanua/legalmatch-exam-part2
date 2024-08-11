import classNames from "classnames";
import {useState} from "react";

function DateField({id, label, value, placeholder, onChange, required = false}) {
  const [valid, setValid] = useState(true);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.trim().length === 0 && required) {
      setValid(false);
      return;
    }

    const date = new Date(inputValue);
    if (required && isNaN(date.getTime())) {
      // date is required and date input is invalid
      setValid(false);
      return;
    }

    if (!required && isNaN(date.getTime())) {
      setValid(false); // invalid but not required
    }

    if (!isNaN(date.getTime())) {
      // valid date
      setValid(true);

      if (onChange) {
        onChange(inputValue);
      }
    }
  }

  const validClasses = classNames(
    'grow block w-full h-12 rounded-2xl py-1.5',
    'px-4 ring-1 ring-inset placeholder:text-gray-400',
    'focus:ring-2 focus:ring-inset'
  );

  const invalidClasses = classNames(
    validClasses,
    'border border-red-600 ring-red-600'
  );

  return (
    <div className="flext w-full m-2 p-2 items-start justify-evenly">
      {label && <label htmlFor={id} className="mr-2">{label}</label>}
      <input
        type="date"
        id={id}
        defaultValue={value}
        className={valid ? validClasses : invalidClasses}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}

export default DateField;
