import React, { useEffect, useRef, useState } from "react";
import '../styles/common.css'

function CustomerPage() {
    const [isLogged, setIsLogged] = useState(sessionStorage.getItem("isLogged"));
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [username, setUserName] = useState(sessionStorage.getItem("username"));
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
    const [relaod, setrelaod] = useState(false);

    const [cfname, setcfname] = useState("");
    const [clname, setclname] = useState("");
    const [cmobile, setcmobile] = useState("");

    useEffect(() => {
        setcfname(sessionStorage.getItem("cfname"));
        setclname(sessionStorage.getItem("clname"));
        setcmobile(sessionStorage.getItem("cmobile"));
    }, [relaod]);

    function handleAddCustomer(){
        sessionStorage.setItem("cfname",cfname);
        sessionStorage.setItem("clname",clname);
        sessionStorage.setItem("cmobile",cmobile);
    }

    function handleClearCustomer(){
        sessionStorage.removeItem("cfname")
        sessionStorage.removeItem("clname")
        sessionStorage.removeItem("cmobile")

        setcfname("");
        setclname("");
        setcmobile("");

    }

    return (
        <div className="row col-lg-12 customer" style={{ height: '100%', margin: '0', padding: '0' }}>
            <div className="col-lg-12  d-flex flex-column justify-content-center align-items-center">
                <div className="p-3" style={{ width: '80%' }}>
                    <h1 className="page-title">Customer</h1>
                    <div className="form-group">
                        <label htmlFor="">First Name</label>
                        <input type="text" value={cfname} onChange={(e)=>setcfname(e.target.value)} className='form-control' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Last Name</label>
                        <input type="text" value={clname} onChange={(e)=>setclname(e.target.value)} className='form-control' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Mobile Number</label>
                        <input type="text" value={cmobile} onChange={(e)=>setcmobile(e.target.value)} className='form-control' />
                    </div>

                    <div className="row d-flex  justify-content-center align-items-center">
                        <button className="btn m-3" onClick={handleClearCustomer}>Clear</button>
                        <button className="btn m-3" onClick={handleAddCustomer} >Next</button>
                    </div>
                </div>

            </div>


        </div>
    );
}

export default CustomerPage;