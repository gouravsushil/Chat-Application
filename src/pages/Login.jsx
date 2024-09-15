import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';
// import { use } from '../../../../server/routes/userRoutes';


function Login() {

    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",

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
        try {
            if (handleValidation()) {
                const { id, username, password } = values;
                console.log('Logging in registered user'); // Add this line before the API call
                const { data } = await axios.post(loginRoute, { // The post request to the server to login a user is made here using the axios library. The data object is destructured from the response object. The data object contains the response from the server. The response object contains the user object which is the user that was created in the database. The user object is then stored in the local storage using the setItem method. The user object is stringified using the JSON.stringify method. The user object is stored in the chat-app-user key in the local storage. The user is then redirected to the home page using the navigate method.
                    id, username, password,
                });
                console.log(data.user);
                if (data.success) {
                    console.log(data.user.id);
                }
                // console.log(data.user);
                if (!data.success) {
                    toast.error(data.message, toastOptions);
                }
                if (data.success) {
                    console.log(data.user);
                    localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                    // toast.success(data.message, toastOptions);
                }
                navigate("/");
            }
        } catch (error) {
            if (error.response) {
                toast.error("Wrong Username or Password", toastOptions);
            }
            else if (error.request) {
                toast.error("Network Error", toastOptions);
            }
            else {
                toast.error("An unexpected error occured. Please try again later.", toastOptions);
            }
        }
    }

    const handleValidation = () => {
        const { password, username } = values;
        if (password === "") {
            toast.error('Email and Password is required ', toastOptions);
            return false;
        }
        else if (username === "") {
            toast.error('Email and Password is required ', toastOptions);
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
                    <input type="text" placeholder='Username' name='username' onChange={(e) => handleChange(e)} min="3" />
                    <input type="password" placeholder='Password' name='password' onChange={(e) => handleChange(e)} />
                    <button type='Submit'>Login</button>
                    <span>Don't have an account ? <Link to='/register'>Register</Link></span>

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

export default Login
