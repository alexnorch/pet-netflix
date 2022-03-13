import { useState } from "react";

const useForm = (initialValues) => {
    const [inputValue, setInputValue] = useState(initialValues)
    const [valueHasError, setValueHasError] = useState(initialValues)

    const validate = () => {
        const error = {}
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
        if (!inputValue.email) {
          error.email = 'Email is required!'
        } else if (!emailRegex.test(inputValue.email)) {
          error.email = 'Please enter a valid email'
        }
    
        if (!inputValue.password) {
          error.password = 'Password is required!'
        } else if (inputValue.password.length < 6) {
          error.password = 'Must be greater then 6 characters'
        }
    
        if (!inputValue.confirm_password) {
          error.confirm_password = 'Please confirm your password'
        } else if (inputValue.password !== inputValue.confirm_password) {
          error.confirm_password = 'Must be the same'
        }
    
        if (Object.keys(error).length == 0) {
          return true
        } else {
          setValueHasError(error)
        }
      }

    const inputHandler = (e) => {
        const { name, value } = e.target

        setInputValue(prevState => ({
            ...prevState,
            [name]: [value]
        }))
    }

    return {
        inputValue,
        inputHandler,
        valueHasError,
        validate
    }
}

export default useForm;