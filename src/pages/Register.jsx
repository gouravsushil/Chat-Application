import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';
// import { use } from '../../../../server/routes/userRoutes';


function Register() {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
            navigate("/");
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { username, email, password } = values;
            console.log('Attempting to register user'); // Add this line before the API call
            const { data } = await axios.post(registerRoute,  // The post request to the server to register a user is made here using the axios library. The data object is destructured from the response object. The data object contains the response from the server. The response object contains the user object which is the user that was created in the database. The user object is then stored in the local storage using the setItem method. The user object is stringified using the JSON.stringify method. The user object is stored in the chat-app-user key in the local storage. The user is then redirected to the home page using the navigate method.
                {
                    username, email, password,
                });
            console.log(data);
            if (!data.success) {
                toast.error(data.message, toastOptions);
            }
            if (data.success) {
                console.log("User registered successfully");
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                // toast.success(data.message, toastOptions);
            }
            navigate("/");

        }
    }

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error('Passwords do not match', toastOptions);
            return false;
        }
        else if (username.length < 3) {
            toast.error('Username must be greater than 3 characters', toastOptions);
            return false;
        }
        else if (password < 8) {
            toast.error('Password must be greater than 8 characters', toastOptions);
            return false;
        }
        else if (email === "") {
            toast.error('Email is required', toastOptions);
            return false;
        }
        return true;
    }
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>Chatty</h1>
                    </div>
                    <input type="text" placeholder='Username' name='username' onChange={(e) => handleChange(e)} />
                    <input type="email" placeholder='Email' name='email' onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder='Password' name='password' onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={(e) => handleChange(e)} />
                    <button type='Submit'>Create User</button>
                    <span>Already have an account ? <Link to='/login'>Login</Link></span>

                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
          height: 5rem;
        }
        h1 {
          color: white;
          text-transform: uppercase;
        }
    }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
     
    button {
        background-color: #4e0eff;
        height: 3rem;
        color: white;
        padding 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover {
            background-color: #4e0eff;
        }
    }

    span{
        color: white;
        text-transform: uppercase;
        a{
            color: #4e0eff;
            text-decoration: none;
            font-weight: bold;
            transition: 0.5s ease-in-out;
            &:hover {
                color: #4e0eff;
            }
        }
    }

`

export default Register
