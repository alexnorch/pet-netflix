import * as React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const baseURL = "https://identitytoolkit.googleapis.com/v1/accounts:";
const apiKey = "AIzaSyDtLaEjJtZ7Ik_xwjsv1ugrXMwMSQbUPnc";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const initialValues = {
  email: '',
  password: '',
  confirm_password: '',
}

const SignUp = () => {
  const { inputValue, inputHandler, valueHasError, validate } = useForm(initialValues)
  const [hasError, setHasError] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isAlert, setIsAlert] = useState(false);
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();

    if (validate()) {
      const response = await fetch(`${baseURL}signUp?key=${apiKey}`, {
        method: "POST",
        body: JSON.stringify({
          email: inputValue.email,
          password: inputValue.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const result = await response.json();
  
      if (!result.error) {
        setAlertMessage("Successfully Registered");
        setTimeout(() => {
          navigate('/signin')
        }, 2000)
      } else {
        setAlertMessage(result.error.message);
        setHasError(true)
      }
  
      showAlert();
    }
  };

  const showAlert = () => {
    setIsAlert(true);
  };

  const closeAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsAlert(false);
  };

  document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6),
     rgba(0,0,0,0.6)), url("https://wallpaperaccess.com/full/752715.jpg")`;
     
  return (
    <main>
      <div className="container">
        <div className="auth">
          <div className="auth__content">
            <h1 className="auth__title">Sign Up</h1>
            <form onSubmit={submitHandler} className="auth__form">
              <div className="input-group">
                <input
                  name='email'
                  value={inputValue.email}
                  onChange={inputHandler}
                  type="text"
                  placeholder="Email"
                  required
                />
                <p className="auth__error">{valueHasError.email}</p>
              </div>
              <div className="input-group">
                <input
                  name="password"
                  value={inputValue.password}
                  onChange={inputHandler}
                  type="password"
                  placeholder="Password"
                  required
                />
                <p className="auth__error">{valueHasError.password}</p>
              </div>
              <div className="input-group">
                <input
                  name='confirm_password'
                  value={inputValue.confirm_password}
                  onChange={inputHandler}
                  type="password"
                  placeholder="Repeat password"
                  required
                />
                <p className="auth__error">{valueHasError.confirm_password}</p>
              </div>
              <button className="auth__btn">Register</button>
            </form>
            <div className="auth__bottom">
              <p className="auth__text">Have an account already?</p>
              <Link className="auth__link" to="/signin">
                Sign in now
              </Link>
            </div>
          </div>
        </div>
        <Snackbar open={isAlert} autoHideDuration={3000} onClose={closeAlert}>
          <Alert
            onClose={closeAlert}
            severity={hasError ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    </main>
  );
};

export default SignUp;
