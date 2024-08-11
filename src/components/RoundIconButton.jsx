import classNames from "classnames";

function RoundIconButton({className, text, icon, onClick}) {
  const classes = classNames(
    'icon-button p-4 m-1 rounded-3xl',
    className
  );

  return (
    <button className={classes} onClick={onClick}>
      {icon}
      {text || ''}
    </button>
  );
}

export default RoundIconButton;
