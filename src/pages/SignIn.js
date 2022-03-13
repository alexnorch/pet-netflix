import * as React from "react";
import "./Auth.scss";
import { useState } from "react";
import { login } from "../store/profileSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const baseURL = "https://identitytoolkit.googleapis.com/v1/accounts:";
const apiKey = "AIzaSyDtLaEjJtZ7Ik_xwjsv1ugrXMwMSQbUPnc";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignIn = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showError = () => {
    setHasError(true);
  };

  const closeError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setHasError(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseURL}signInWithPassword?key=${apiKey}`, {
      method: "POST",
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!result.error) {
      dispatch(
        login({
          token: result.idToken,
          userId: result.localId,
          userEmail: result.email,
        })
      );
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      showError();
      setErrorMessage(result.error.message);
    }
  };
  document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6),
     rgba(0,0,0,0.6)), url("https://wallpaperaccess.com/full/752715.jpg")`;
  return (
    <main>
      <div className="container">
        <div className="auth">
          <div className="auth__content">
            <h1 className="auth__title">Sign in</h1>
            <form onSubmit={submitHandler} className="auth__form">
              <div className="input-group">
                <input
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="input-group">
                <input
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button className="auth__btn">Sign in</button>
            </form>
            <div className="auth__bottom">
              <p className="auth__text">New to Netflix?</p>
              <Link className="auth__link" to="/signup">
                Sign up now
              </Link>
            </div>
          </div>
        </div>
        <Snackbar open={hasError} autoHideDuration={3000} onClose={closeError}>
          <Alert onClose={closeError} severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </div>
    </main>
  );
};

export default SignIn;
