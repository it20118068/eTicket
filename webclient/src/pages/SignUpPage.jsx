import React, { useEffect, useRef, useState } from "react";
import '../styles/login.css'
import { ToastContainer, toast } from 'react-toastify';
import RestService from "../services/RestService";
import logo from "../assets/Logo.png"

/**
 * Sign up page
 */
function SignUpPage() {


    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [nic, setnic] = useState('');
    const [mobile, setmobile] = useState('');
    const [password, setpassword] = useState('');
    const [rePassword, setrePassword] = useState('');

    // Handle Register user    
    function handleRegister(){
        if(username == '' || email=='' || fname==''|| lname == '' || nic =='' || mobile==''|| password==''|| rePassword == ''){
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

        const userDto = {
            _id:"",
            userName:username,
            password:password,
            role:"1",
            nic:nic,
            firstName:fname,
            lastName:lname,
            mobileNo:mobile,
            email:email,
            isActive:true
        }

        RestService.register(userDto).then((res)=>{
            if(res.data.isSuccess==true){
                toast.success('Successfully registered to the system', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                clearInputs();
            }
        }).catch(err =>{
            console.log(err)
            toast.error('Something went wrong. Please try again!!', {
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

    // Clear input fields
    function clearInputs(){
        setusername('');
        setemail('');
        setfname('');
        setlname('');
        setnic('');
        setmobile('');
        setpassword('');
        setrePassword('');
    }


    

    return (
        <div className="login-bg row col-lg-12" style={{ margin: '0' }}>

            <div className="col-lg-6 d-flex flex-column  justify-content-center align-items-center">
                <div className="custom-border-left p-5 custom-border-top">
                    <h1 className="ml-3" style={{ fontWeight: 'bolder', fontSize: '3rem' }}>WELCOME TO</h1>
                    <h1 className="nav-title" style={{ fontSize: '6rem', marginLeft: '20%', color: "white", stroke: 'CaptionText' }}>eTicket</h1>
                    <h1 className="ml-3" style={{ fontWeight: 'bolder' }}>BOOK <span style={{ fontWeight: '100' }}>YOUR</span>  TRAIN</h1>
                </div>
            </div>

            <div className="col-lg-6 d-flex  justify-content-center align-items-center" >
                <div className="register-card  p-3">
                    <div className="d-flex mb-4 justify-content-center align-items-center">
                        <h1 className="">SIGN UP</h1>
                    </div>
                    <div className="col-lg-12 row mt-3">
                        <div className="col-lg-2">
                            <label htmlFor="">Username</label>
                        </div>
                        <div className="col-lg-4">
                            <input type="text" value={username} onChange={(e) => setusername(e.target.value)} className='form-control' />
                        </div>
                        <div className="col-lg-2">
                            <label htmlFor="">Email</label>
                        </div>
                        <div className="col-lg-4">
                            <input type="text" value={email} onChange={(e) => setemail(e.target.value)} className='form-control' />
                        </div>    
                    </div>
                    <div className="col-lg-12 row mt-3">
                        <div className="col-lg-2">
                            <label htmlFor="">First name</label>
                        </div>
                        <div className="col-lg-4">
                            <input type="text" value={fname} onChange={(e) => setfname(e.target.value)} className='form-control' />
                        </div>
                        <div className="col-lg-2">
                            <label htmlFor="">Last Name</label>
                        </div>
                        <div className="col-lg-4">
                            <input type="Text" value={lname} onChange={(e) => setlname(e.target.value)} className='form-control' />
                        </div>    
                    </div>
                    <div className="col-lg-12 row mt-3">
                        <div className="col-lg-2">
                            <label htmlFor="">NIC</label>
                        </div>
                        <div className="col-lg-4">
                            <input type="text" value={nic} onChange={(e) => setnic(e.target.value)} className='form-control' />
                        </div>
                        <div className="col-lg-2">
                            <label htmlFor="">Mobile</label>
                        </div>
                        <div className="col-lg-4">
                            <input type="Text" value={mobile} onChange={(e) => setmobile(e.target.value)} className='form-control' />
                        </div>    
                    </div>
                    <div className="col-lg-12 row mt-3">
                        <div className="col-lg-2">
                            <label htmlFor="" >Password</label>
                        </div>
                        <div className="col-lg-4">
                            <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} className='form-control' />
                        </div>
                        <div className="col-lg-2">
                            <label htmlFor="">Re-password</label>
                        </div>
                        <div className="col-lg-4">
                            <input type="password" value={rePassword} onChange={(e) => setrePassword(e.target.value)} className='form-control' />
                        </div>    
                    </div>

                    <div className="form-group d-flex justify-content-center align-items-center mt-4">
                            <button className='btn btn-light' onClick={handleRegister}>Sign Up</button>
                        </div>
                        <div className="form-group d-flex justify-content-center align-items-center">
                            <label style={{margin:'0', padding:'0'}}>Already have an account? </label>                          
                        </div>
                        <div className="form-group d-flex justify-content-center align-items-center">
                            <a className="sign-up-link" href="/login">Sign in now</a>
                        </div>
                </div>
                
            </div>

        </div>
    );
}

export default SignUpPage;