import logo from '../assets/logo.svg';
import TextField from "../components/TextField";
import {useState} from "react";
import {useDependencies} from "../context/Dependencies";
import {Navigate, useNavigate} from "react-router";
import {useSnackbar} from "notistack";
import validateEmail from "../utils/validateEmail";
import {Link} from "react-router-dom";
import classNames from "classnames";


function RegisterUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {currentUser, authService, setSignedIn, setCurrentUser} = useDependencies();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate email
    if (!validateEmail(email)) {
      enqueueSnackbar('Invalid email address!');
      return;
    }

    if (password !== confirmPassword) {
      enqueueSnackbar('Confirm Password do not match!');
      return;
    }

    authService.register(email, password)
      .then((user) => {
        setCurrentUser(user);
        setSignedIn(true);
        navigate(('/employees'));
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Failed to create an account!');
      });
  }

  const handleEmailChange = (email) => {
    if (!validateEmail(email)) {
      return false;
    }

    setEmail(email);
    return true;
  }

  const handleConfirmPasswordChange = (newConfirmPassword) => {
    setConfirmPassword(newConfirmPassword);
    return password === confirmPassword;
  }

  const wrapperClassName = classNames(
    'class flex min-h-full flex-col justify-center px-6 py-14 lg:px-8',
    '2xl:py-[350px]',
    'xl:py-48',
    'lg:py-44',
    'md:py-40',
    'sm:py-32'
  );

  return currentUser ? <Navigate to="/employees"/> : (
    <div className={wrapperClassName}>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-14 w-auto" src={logo} alt="Your Company"/>
        <h2
          className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register an Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="ml-4 block text-sm font-medium leading-tight text-gray-900">Email
              address</label>
            <div className="mt-2">
              <TextField
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={email}
                required
                onChange={handleEmailChange}
                className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="ml-4 block text-sm font-medium leading-tight text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <TextField
                id="password"
                name="password"
                type="password"
                defaultValue={password}
                autoComplete="current-password"
                required
                onChange={(value) => setPassword(value)}
                className="block w-full border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="ml-4 block text-sm font-medium leading-tight text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <TextField
                id="confirm_password"
                name="confirm_password"
                type="password"
                defaultValue={confirmPassword}
                required
                onChange={handleConfirmPasswordChange}
                className="block w-full border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="p-2">
            <button
              type="submit"
              className="flex w-full rounded-2xl h-12 items-center justify-center bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-700 shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an existing account?
          <Link to="/login"
                className="ml-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterUser;
