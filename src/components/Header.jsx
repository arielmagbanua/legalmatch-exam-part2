import classNames from "classnames";

export function Header({className}) {
  const classes = classNames(
    'header flex text-2xl',
    className,
  );

  return (
    <header className={classes}>
      <h1>Employee Database</h1>
    </header>
  );
}

export default Header;
