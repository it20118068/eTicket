import React, { useEffect, useRef, useState } from "react";
import '../styles/common.css'
import RestService from "../services/RestService";
import { ToastContainer, toast } from 'react-toastify';

/**
 * Traveler Management Page
 */
function TravelerManagementPage() {
    const [isLogged, setIsLogged] = useState(sessionStorage.getItem("isLogged"));
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
    const [relaod, setrelaod] = useState(false);

    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [nic, setnic] = useState('');
    const [mobile, setmobile] = useState('');
    const [password, setpassword] = useState('');
    const [rePassword, setrePassword] = useState('');

    const [travlersList, settravlersList] = useState([]);
    const [filteredList, setfilteredList] = useState([]);
    const [selectedUser, setselectedUser] = useState([]);


    // Fetch users from the server
    useEffect(() => {
        RestService.getAllUsers(token).then(res => {
            settravlersList(res.data.userDTOs);
            setfilteredList(res.data.userDTOs);
        }).catch(err => {
            console.log(err)
        })
    }, [relaod]);


    // Handle create traveler profile
    function handleAddTraveler() {
        setrelaod(false);
        if (username == '' || email == '' || fname == '' || lname == '' || nic == '' || mobile == '' || password == '' || rePassword == '') {
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
            _id: "",
            userName: username,
            password: password,
            role: "1",
            nic: nic,
            firstName: fname,
            lastName: lname,
            mobileNo: mobile,
            email: email,
            isActive: true
        }
        
        RestService.register(userDto).then((res) => {

            if (res.data.isSuccess == true) {
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
                setrelaod(true);
            }
            
        }).catch(err => {
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

    // Handle delete traveler profile
    function handleDeleteUser(){
        setrelaod(false);
        RestService.deleteUserByNIC(token, selectedUser.nic).then(res=>{
       
            if (res.data.isSuccess == true) {
                toast.success('Successfully deleted the user', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                document.getElementById('btnClose').click();
                setrelaod(true);
            }
        }).catch(err => {
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

    // Handle traveler status update
    function handleActiveInactiveUser(user, status){
        setrelaod(false);
        user.isActive = status;
        RestService.updateUserById(token, {userDto:user}).then(res=>{
            if (res.data.isSuccess == true) {
                toast.success('Successfully updated the user status', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                document.getElementById('btnClose').click();
                setrelaod(true);
            }
        }).catch(err => {
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

    // Handle search traveler by nic
    function handleSearch(value){
        let temp = [];

        for(let i of travlersList){
            if(i.nic.startsWith(value)){
                temp.push(i);
            }
        }

        setfilteredList(temp);
    }

    // Handle update user profile
    function handleUpdateProfile(){
        setrelaod(false);
        if (email == '' || fname == '' || lname == '' || mobile == '') {
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


        selectedUser.firstName = fname;
        selectedUser.lastName = lname;
        selectedUser.mobileNo = mobile;
        selectedUser.email = email;
        

        RestService.updateUserById(token, {userDto:selectedUser}).then(res=>{
            if (res.data.isSuccess == true) {
                toast.success('Successfully updated the user profile', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                document.getElementById('editBtnClose').click();
                setrelaod(true);
            }
        }).catch(err => {
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


    function clearInputs() {
        setusername('');
        setemail('');
        setfname('');
        setlname('');
        setnic('');
        setmobile('');
        setpassword('');
        setrePassword('');
    }

    function setTraveler(user){
        setusername(user.userName);
        setemail(user.email);
        setfname(user.firstName);
        setlname(user.lastName);
        setnic(user.nic);
        setmobile(user.mobileNo);
        setselectedUser(user);
    }


    return (
        <div className="row page" style={{ height: '100%', margin: '0', padding: '0' }}>
            <div className="d-flex justify-content-center align-items-center page-main-title-box" style={{ margin: '0', padding: '0' }} >
                <h1 className="page-main-title">Traveler Management</h1>
            </div>
            <div className="p-4" style={{ height: '85%', width: '100%' }}>
                <div className="row col-lg-12 p-3">
                    <div className="col-lg-6">
                        <input type="text" onChange={(e)=>handleSearch(e.target.value)} className="form-control" placeholder="Search NIC" />
                    </div>
                    <div className="col-lg-6" >
                        <button className="btn btn-light  " data-toggle="modal" data-target="#addTravelerModal" style={{ float: 'right' }}>Add Traveler</button>
                    </div>
                </div>

                <div className="p-3">
                    <table class="table table-hover custom-table" style={{ color: 'white' }}>
                        <thead>
                            <tr>
                                <th scope="col">NIC</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredList != null &&
                                filteredList.map(t =>
                                    <tr>
                                        <td>{t.nic}</td>
                                        <td>{t.firstName}</td>
                                        <td>{t.lastName}</td>
                                        <td>{t.email}</td>
                                        <td>{t.userName}</td>
                                        <td>{t.isActive ? "ACTIVE" : "INACTIVE"}</td>
                                        <td>
                                            <button class="btn btn-light " onClick={()=>setselectedUser(t)}  data-toggle="modal" data-target="#deleteModal"><i class="fa fa-trash"></i></button>
                                            <button class="btn btn-light ml-2" onClick={()=>setTraveler(t)}   data-toggle="modal" data-target="#updateTravelerModal"><i class="fa fa-edit "></i></button>
                                            <button class={t.isActive ? "btn btn-light ml-2" : "display-none"} onClick={()=>handleActiveInactiveUser(t,false)} ><i class="fa fa-pause "></i></button>
                                            <button class={t.isActive ? "display-none" : "btn btn-light ml-2"} onClick={()=>handleActiveInactiveUser(t,true)}><i class="fa fa-play "></i></button>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>

            </div>

            {/* Create Profile Modal */}
            <div class="modal fade" id="addTravelerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document" >
                    <div class="modal-content modal-bg" >
                        <div class="modal-header modal-header-bg">
                            <h5 class="modal-title" id="exampleModalLongTitle">Create Traveler Profile</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">First Name</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" value={fname} onChange={(e) => setfname(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">Last Name</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" value={lname} onChange={(e) => setlname(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">NIC</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" value={nic} onChange={(e) => setnic(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">Mobile</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" value={mobile} onChange={(e) => setmobile(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">Username</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" value={username} onChange={(e) => setusername(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">Email</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" value={email} onChange={(e) => setemail(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">Password</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" value={password} onChange={(e) => setpassword(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">Re-Password</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" value={rePassword} onChange={(e) => setrePassword(e.target.value)} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-dark" onClick={handleAddTraveler} >Create Profile</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete profile Modal */}
            <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content modal-bg">
                        <div class="modal-header modal-header-bg">
                            <h5 class="modal-title" id="exampleModalLongTitle">Delete Traveler Profile</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete {selectedUser != null && selectedUser.firstName + " " + selectedUser.lastName}?
                        </div>
                        <div class="modal-footer">
                            <button type="button" id="btnClose" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button"  class="btn btn-dark" onClick={handleDeleteUser}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Update Profile Modal */}
            <div class="modal fade" id="updateTravelerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document" >
                    <div class="modal-content modal-bg" >
                        <div class="modal-header modal-header-bg">
                            <h5 class="modal-title" id="exampleModalLongTitle">Update Traveler Profile</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">First Name</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" value={fname} onChange={(e) => setfname(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">Last Name</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" value={lname} onChange={(e) => setlname(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">NIC</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" readOnly value={nic} style={{backgroundColor:'#4a0061',color:'white'}} onChange={(e) => setnic(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">Mobile</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" value={mobile} onChange={(e) => setmobile(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">Username</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" readOnly style={{backgroundColor:'#4a0061',color:'white'}} value={username} onChange={(e) => setusername(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">Email</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" value={email} onChange={(e) => setemail(e.target.value)} className="form-control" />
                                </div>
                            </div>
                           
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" id="editBtnClose" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-dark" onClick={handleUpdateProfile} >Update Profile</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default TravelerManagementPage;