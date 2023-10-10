import React, { useEffect, useRef, useState } from "react";
import '../styles/login.css'
import { ToastContainer, toast } from 'react-toastify';
import RestService from "../services/RestService";
import logo from "../assets/Logo.png"

/**
 * Login page
 */
function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //Handle Authentication
    function handleAuthenticate() {
        if (username == '' || password == '') {
            toast.error('Inputs cannot be empty!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        RestService.authenticateUser(username, password).then((res) => {
            console.log(res.data)
            if (res.data.token != null) {
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("isLogged", true);
             

                sessionStorage.setItem("name", res.data.data[0].firstName);
                sessionStorage.setItem("email", res.data.data[0].email);

                sessionStorage.setItem("role", res.data.data[0].role);
                sessionStorage.setItem("username", res.data.data[0].userName);

                // sessionStorage.setItem("userId", res.data.userDto.userId);
                window.location.href = '/';
            } else {
                alert('Failed Login')
            }
        }).catch((err) => {
            console.log(err);
            toast.error('Login failed!! Please try again.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        })
    }

    return (
        <div className="login-bg row col-lg-12" style={{ margin: '0' }}>

            <div className="col-lg-6 d-flex flex-column  justify-content-center align-items-center">
                <div className="custom-border-left p-5 custom-border-top">
                    <h1 className="ml-3" style={{ fontWeight: 'bolder', fontSize: '3rem' }}>WELCOME TO</h1>
                    <h1 className="nav-title" style={{ fontSize: '6rem', marginLeft: '20%', color:"white", stroke:'CaptionText' }}>eTicket</h1>
                    <h1 className="ml-3" style={{ fontWeight: 'bolder' }}>BOOK <span style={{ fontWeight: '100' }}>YOUR</span>  TRAIN</h1>
                </div>
            </div>

            <div className="col-lg-6 d-flex  justify-content-center align-items-center">
                <div className="login-card">
                    <div className="d-flex mb-4 justify-content-center align-items-center">
                        <h1 className="">LOGIN</h1>
                    </div>
                    <div>
                        <div className="form-group">
                            <label htmlFor="">Username</label>
                            <input type="text" onChange={(e) => setUsername(e.target.value)} className='form-control' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} className='form-control' />
                        </div>
                        <div className="form-group d-flex justify-content-center align-items-center">
                            <button className='btn btn-light' onClick={handleAuthenticate}>Login</button>
                        </div>
                        <div className="form-group d-flex justify-content-center align-items-center">
                            <label style={{margin:'0', padding:'0'}}>Don't have an account? </label>                          
                        </div>
                        <div className="form-group d-flex justify-content-center align-items-center">
                            <a className="sign-up-link" href="/register">Sign up now</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default LoginPage;