import React, { useEffect, useRef, useState } from "react";
import '../styles/login.css'
import { ToastContainer, toast } from 'react-toastify';
import RestService from "../services/RestService";

function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleAuthenticate(){  


        if(username =='' || password ==''){
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
  
        RestService.authenticateUser(username, password).then((res)=>{
            console.log(res.data)
            if(res.data.token != null){
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("isLogged", true);     
                          
                sessionStorage.setItem("name", res.data.userDto.name);
                sessionStorage.setItem("email", res.data.userDto.email);
                
                sessionStorage.setItem("role", res.data.userDto.userRole);
                sessionStorage.setItem("username", res.data.userDto.username);
  
                sessionStorage.setItem("userId", res.data.userDto.userId);
                window.location.href = '/'; 
            } else {
                alert('Failed Login')
            }
        }).catch((err)=>{
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
        <div className="login-bg d-flex flex-column justify-content-center align-items-center">
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
                    <button className='btn btn-light' onClick={handleAuthenticate} >Login</button>
                </div>
            </div>
            </div>
        </div>
    );
}

export default LoginPage;