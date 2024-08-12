import classNames from "classnames";
import RoundIconButton from "./RoundIconButton";
import {IoLogOut} from "react-icons/io5";
import {useNavigate} from "react-router";
import {useDependencies} from "../context/Dependencies";
import {useSnackbar} from "notistack";

export function Header({className, title}) {
  const navigate = useNavigate();
  const {setSignedIn, authService} = useDependencies();
  const {enqueueSnackbar} = useSnackbar();

  const classes = classNames(
    'header fixed items-center justify-between flex text-2xl px-32 py-4 w-full shadow-md bg-gray-300 z-10',
    className,
  );

  const handleLogoutClick = async () => {
    authService.logout().then((_) => {
      setSignedIn(false);
      navigate('/login');
    }).catch((_) => {
      enqueueSnackbar('Failed to logout!');
    });
  }

  return (
    <header className={classes}>
      <h1>{title}</h1>
      <RoundIconButton
        text="Logout"
        className="bg-red-400 my-0 py-4 m-0 rounded-3xl text-sm flex justify-between items-center"
        icon={<IoLogOut/>}
        onClick={handleLogoutClick}
      />
    </header>
  );
}

export default Header;
