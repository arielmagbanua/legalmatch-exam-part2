import classNames from "classnames";
import {IoMdRemoveCircle} from "react-icons/io";

function DeletableCheckbox({className, children, checked, onCheck, onDelete}) {
  const classes = classNames(
    'flex flex-nowrap items-center justify-start',
    className,
  );

  return (
    <div className={classes}>
      {children}
      <input
        type="checkbox"
        className="w-6 h-6 mr-4"
        onChange={onCheck}
        checked={checked}
      />
      <IoMdRemoveCircle className="text-3xl text-red-500 cursor-pointer" onClick={onDelete}/>
    </div>
  );
}

export default DeletableCheckbox;
