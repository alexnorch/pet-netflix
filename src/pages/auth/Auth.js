import React from 'react'
import { useState } from 'react'
import * as Yup from 'yup'
import { login } from '../../store/profileSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import './Auth.scss'

// Mui material
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Auth = () => {

    const [isSignIn, setIsSignIn] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: isSignIn ?
            Yup.object({
                email: Yup.string()
                    .email('Please enter a valid email')
                    .required('Email is required'),
                password: Yup.string()
                    .min(6, 'Must be greater then 6 characters')
                    .required('Password is required')
            }) :
            Yup.object({
                email: Yup.string()
                    .email('Please enter a valid email')
                    .required('Email is required'),
                password: Yup.string()
                    .min(6, 'Must be greater then 6 characters')
                    .required('Password is required'),
                confirmPassword: Yup.string()
                    .required('Confirm your passord')
                    .oneOf([Yup.ref('password')], 'Your password do not match')
            }),
        onSubmit: ({ email, password }) => {
            authHandler(email, password)
        }
    })

    const closeError = (event, reason) => {
        if (reason === "clickaway") return

        setHasError(false);
    };

    const showError = () => setHasError(true);

    const authHandler = async (email, password) => {

        const baseURL = isSignIn ?
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDtLaEjJtZ7Ik_xwjsv1ugrXMwMSQbUPnc' :
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDtLaEjJtZ7Ik_xwjsv1ugrXMwMSQbUPnc'

        const response = await fetch(baseURL, {
            method: "POST",
            body: JSON.stringify({ email, password, returnSecureToken: true }),
            headers: { "Content-Type": "application/json" }
        });

        const result = await response.json();

        if (result.error) {
            setErrorMessage(result.error.message)
            setHasError(true)
            return
        }

        if (isSignIn) {
            dispatch(login({ token: result.idToken, userId: result.localId, userEmail: result.email }));
            setTimeout(() => navigate("/"), 1000);
        } else {
            setTimeout(() => navigate('/auth'), 2000)
        }

        showError()
    }

    return (
        <main>
            <div className="container">
                <div className="auth">
                    <div className="auth__content">
                        <h1 className="auth__title">Sign in</h1>
                        <form className="auth__form">
                            {isSignIn ? (
                                <>
                                    <div className="input-group">
                                        <input
                                            onChange={handleChange}
                                            value={values.email}
                                            name='email'
                                            type="text"
                                            placeholder="Email"
                                            required
                                        />
                                        {errors.email && <p className="auth__error">{errors.email}</p>}
                                    </div>
                                    <div className="input-group">
                                        <input
                                            onChange={handleChange}
                                            value={values.password}
                                            name='password'
                                            type="password"
                                            placeholder="Password"
                                            required
                                        />
                                        {errors.password && <p className="auth__error">{errors.password}</p>}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="input-group">
                                        <input
                                            onChange={handleChange}
                                            value={values.email}
                                            name='email'
                                            type="text"
                                            placeholder="Email"
                                            required
                                        />
                                        {errors.email && <p className="auth__error">{errors.email}</p>}
                                    </div>
                                    <div className="input-group">
                                        <input
                                            onChange={handleChange}
                                            value={values.password}
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            required
                                        />
                                        {errors.password && <p className="auth__error">{errors.password}</p>}
                                    </div>
                                    <div className="input-group">
                                        <input
                                            onChange={handleChange}
                                            value={values.confirmPassword}
                                            name='confirmPassword'
                                            type="password"
                                            placeholder="Repeat password"
                                            required
                                        />
                                        {errors.confirmPassword && <p className="auth__error">{errors.confirmPassword}</p>}
                                    </div>
                                </>
                            )}
                            <button
                                onClick={handleSubmit}
                                type='submit'
                                className="auth__btn">
                                {isSignIn ? 'Sign in' : 'Register'}
                            </button>
                        </form>
                        <div className="auth__bottom">
                            <p className='auth__text'>{isSignIn ? 'New to Netflix?' : 'Already have an account?'}</p>
                            <button
                                onClick={() => setIsSignIn(prevState => !prevState)}
                                className='auth__button'>{isSignIn ? 'Create an account' : 'Log in'}
                            </button>
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
    )
}

export default Auth