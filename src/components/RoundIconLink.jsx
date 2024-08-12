import {Link} from "react-router-dom";
import classNames from "classnames";

function RoundIconLink({className, to, text, icon}) {
  const classes = classNames(
    'icon-button p-4 m-1 rounded-3xl shadow-md',
    className
  );

  const iconClassName = classNames(
    text ? 'mr-2' : ''
  );

  return (
    <Link className={classes} to={to}>
      <span className={iconClassName}>{icon}</span>
      {text}
    </Link>
  );
}

export default RoundIconLink;