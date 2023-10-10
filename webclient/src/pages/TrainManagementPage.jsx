import React, { useEffect, useRef, useState } from "react";
import '../styles/common.css'
import RestService from "../services/RestService";
import { ToastContainer, toast } from 'react-toastify';
import { CommonStatus } from "../enums/CommonStatus.ts";

/**
 * Train Management Page
 */
function TrainManagementPage() {
    const [isLogged, setIsLogged] = useState(sessionStorage.getItem("isLogged"));
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [username, setUserName] = useState(sessionStorage.getItem("username"));
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
    const [reload, setReload] = useState(false);

    const [filteredList, setfilteredList] = useState([]);

    const [tid, settid] = useState('');
    const [tName, settName] = useState('');
    const [tCode, settCode] = useState('');
    const [tStatus, settStatus] = useState('');
    const [trainList, settrainList] = useState([]);
    const [selectedTrain, setselectedTrain] = useState({
        _id: "65239332fc521a1b8ac6ba04",
        trainName: "Yaal Devi",
        trainCode: "Y002",
        status: 0
    });


    const [schedulesList, setschedulesList] = useState([]);
    const [from, setfrom] = useState('');
    const [to, setto] = useState('');
    const [departAt, setdepartAt] = useState('');
    const [arrivalAt, setarrivalAt] = useState('');
    const [price, setprice] = useState('');

    const [selectedSchedule, setselectedSchedule] = useState();






    // Fetch all trains from the server
    useEffect(() => {
        RestService.getAllTrains(token, {}).then(res => {
            settrainList(res.data.trainDTOs);
            setfilteredList(res.data.trainDTOs);
        }).catch(err => {
            console.log(err)
        })
    }, [reload]);

    // Clear input fields
    function clearInputs() {
        settid('');
        settName('');
        settCode('');
        settStatus('')

        setfrom('');
        setto('');
        setdepartAt('');
        setarrivalAt('');
        setprice('');
        setselectedSchedule([])
    }

    // Handle add new train
    function handleAddTrain() {
        if (tName == '' || tCode == '') {
            toast.error("Input fields cannot be null", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            return
        }

        const trainDto = {
            _id: "",
            trainName: tName,
            trainCode: tCode,
            status: 0
        }

        RestService.addTrain(token, { trainDTO: trainDto }).then(res => {
            toast.success("Train added successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setReload(true);
            document.getElementById("tClose").click();
            clearInputs();
        }).catch(err => {
            console.log(err)
            toast.error("Something went wrong. Please try again.", {
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

    // Handle get schedule list by train Code
    function handleGetSchedulesByTrainId(id) {

        RestService.getSchedulesByTrainId(token, id).then(res => {
            console.log(res.data)
            setschedulesList(res.data.scheduleDTOs);
        }).catch(err => {
            console.log(err)
        })
    }

    // Handle add new train schedule
    function handleAddSchedule() {
        if (from == '' || to == '' || departAt == '' || arrivalAt == '' || price == '') {
            toast.error("Input fields cannot be null", {
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

        const scheduleDTO = {
            _id: "",
            startingTime: departAt,
            arrivalTime: arrivalAt,
            train: selectedTrain,
            startPoint: from,
            endPoint: to,
            ticketPrice: price,
            status: 0
        }


        RestService.addSchedule(token, { scheduleDTO: scheduleDTO }).then(res => {
            if (res.data.isSuccess == true) {
                toast.success("Schedule added successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setReload(true)
                document.getElementById("sClose").click();
                clearInputs();
            }
        }).catch(err => {
            console.log(err)
            toast.error("Something went wrong. Please try again.", {
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

    
    // Handle selected train schedule
    function handleSelectedSchedule(schedule){
        setselectedSchedule(schedule);
        setfrom(schedule.startPoint);
        setto(schedule.endPoint);
        setdepartAt(schedule.startingTime);
        setarrivalAt(schedule.arrivalTime);
        setprice(schedule.ticketPrice);
    }

    // Handle cancel train schedule
    function handleCancelSchedule(){
        setReload(false)
        selectedSchedule.status = 2;

        RestService.updateScheduleById(token, { scheduleDTO: selectedSchedule }).then(res => {
            if (res.data.isSuccess == true) {
                toast.success("Schedule cancelled successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setReload(true)
                document.getElementById("cancelScheduleCloseBtn").click();
            }
        }).catch(err => {
            console.log(err)
            toast.error("Something went wrong. Please try again.", {
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

    // Handle train update schedule
    function handleUpdateSchedule(){
        if (from == '' || to == '' || departAt == '' || arrivalAt == '' || price == '') {
            toast.error("Input fields cannot be null", {
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

        selectedSchedule.startPoint = from;
        selectedSchedule.endPoint = to;
        selectedSchedule.startingTime = departAt;
        selectedSchedule.arrivalTime = arrivalAt;
        selectedSchedule.ticketPrice = price;


        RestService.updateScheduleById(token, { scheduleDTO: selectedSchedule }).then(res => {
            if (res.data.isSuccess == true) {
                toast.success("Schedule updated successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setReload(true)
                document.getElementById("updateScheduleCloseBtn").click();
            }
        }).catch(err => {
            console.log(err)
            toast.error("Something went wrong. Please try again.", {
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

    // Handle update train status
    function handleUpdateTrainStatus(){
        setReload(false);

        selectedTrain.status = 2;

        RestService.updateTrainById(token, { trainDTO: selectedTrain }).then(res => {
            if (res.data.isSuccess == true) {
                toast.success("Train cancelled successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setReload(true)
                document.getElementById("btnCancelTrainModal").click();
            }
        }).catch(err => {
            console.log(err)
            toast.error("Something went wrong. Please try again.", {
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

    // Handle update train
    function handleUpdateTrain(){
        setReload(false);

        

        if (tName == '' || tCode == '') {
            toast.error("Input fields cannot be null", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            return
        }
        selectedTrain.trainName = tName;
        RestService.updateTrainById(token, { trainDTO: selectedTrain }).then(res => {
            if (res.data.isSuccess == true) {
                toast.success("Train updated successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setReload(true)
                document.getElementById("btnUpdateModalClose").click();
            }
        }).catch(err => {
            console.log(err)
            toast.error("Something went wrong. Please try again.", {
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

    // Handle seleceted train
    function handleSelectedTrain(train){
        setselectedTrain(train);
        settCode(train.trainCode);
        settName(train.trainName);
    }


    // Handle search train by name
    function handleSearch(value){
        let temp = [];

        for(let i of trainList){
            if(i.trainName.startsWith(value)){
                temp.push(i);
            }
        }

        setfilteredList(temp);
    }

    



    return (
        <div className="row page" style={{ height: '100%', margin: '0', padding: '0' }}>
            <div className="d-flex justify-content-center align-items-center page-main-title-box" style={{ margin: '0', padding: '0' }} >
                <h1 className="page-main-title">Train Management</h1>
            </div>
            <div className="p-4" style={{ height: '85%', width: '100%' }}>
                <div className="row col-lg-12 p-3">
                    <div className="col-lg-6">
                        <input type="text" className="form-control" onChange={(e)=>handleSearch(e.target.value)} placeholder="Search" />
                    </div>
                    <div className="col-lg-6" >
                        <button className="btn btn-light  " data-toggle="modal" data-target="#addNewTrainModal" style={{ float: 'right' }}>Add New Train</button>
                    </div>
                </div>

                <div className="p-3">
                    <table class="table table-hover custom-table" style={{ color: 'white' }}>
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Train Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Schedules</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {filteredList != null && filteredList.map(train =>
                                <tr>
                                    <td>{train.trainCode}</td>
                                    <td>{train.trainName}</td>
                                    <td>{CommonStatus[train.status]}</td>
                                    <td>
                                        <button class="btn btn-light" onClick={(e) => handleGetSchedulesByTrainId(train.trainCode)} data-toggle="modal" data-target="#viewTrainSchedulesModal"><i class="fa fa-list "></i></button>
                                        <button class="btn btn-light ml-2" data-toggle="modal" data-target="#addNewSchedule" onClick={() => setselectedTrain(train)}><i class="fa fa-plus "></i></button>
                                    </td>
                                    <td>
                                        <button class="btn btn-light ml-2" data-toggle="modal" data-target="#updateTrain" onClick={()=>handleSelectedTrain(train)} ><i class="fa fa-edit "></i></button>
                                        <button class="btn btn-light ml-2" data-toggle="modal" onClick={()=>setselectedTrain(train)} data-target="#cancelTrain"><i class="fa fa-close "></i></button>
                                    </td>
                                </tr>
                            )}


                        </tbody>
                    </table>
                </div>

            </div>

            {/* Cancel Train Modal */}
            <div class="modal fade" id="cancelTrain" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content modal-bg">
                        <div class="modal-header modal-header-bg">
                            <h5 class="modal-title" id="exampleModalLongTitle">Cancel Train</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to cancel {selectedTrain != null && selectedTrain.trainName}?
                        </div>
                        <div class="modal-footer">
                            <button type="button" id="btnCancelTrainModal" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={handleUpdateTrainStatus} class="btn btn-dark">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add New Train Modal */}
            <div class="modal fade" id="addNewTrainModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document" >
                    <div class="modal-content modal-bg" >
                        <div class="modal-header modal-header-bg">
                            <h5 class="modal-title" id="exampleModalLongTitle">Add New Train</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">Train Code</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" value={tCode} onChange={(e) => settCode(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">Train Name</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" value={tName} onChange={(e) => settName(e.target.value)} className="form-control" />
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" id="tClose" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-dark" onClick={handleAddTrain}>Add Train</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Update Train Modal */}
            <div class="modal fade" id="updateTrain" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document" >
                    <div class="modal-content modal-bg" >
                        <div class="modal-header modal-header-bg">
                            <h5 class="modal-title" id="exampleModalLongTitle">Update Train</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">Train Code</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" style={{backgroundColor:'#4a0061',color:'white'}} readOnly value={tCode} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">Train Name</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" value={tName} onChange={(e) => settName(e.target.value)} className="form-control" />
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" id="btnUpdateModalClose" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-dark" onClick={handleUpdateTrain}>Update Train</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Train Schedules Modal */}
            <div class="modal fade" id="viewTrainSchedulesModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document" >
                    <div class="modal-content modal-bg" >
                        <div class="modal-header modal-header-bg">
                            <h5 class="modal-title" id="exampleModalLongTitle">Train Schedules - Udarata Manike</h5>
                            <button type="button" class="close"  data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div>
                                <table class="table table-hover custom-table" style={{ color: 'white' }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">From</th>
                                            <th scope="col">To</th>
                                            <th scope="col">Departing At</th>
                                            <th scope="col">Arrival At</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {schedulesList != null && schedulesList.map(s =>
                                            <tr>
                                                <td>{s.startPoint}</td>
                                                <td>{s.endPoint}</td>
                                                <td>{s.startingTime}</td>
                                                <td>{s.arrivalTime}</td>
                                                <td>{CommonStatus[s.status]}</td>
                                                <td>{s.ticketPrice}</td>
                                                <td>
                                                    <button class="btn btn-sm btn-light ml-2" data-toggle="modal" onClick={()=>handleSelectedSchedule(s)} data-target="#updateScheduleModal"><i class="fa fa-edit "></i></button>
                                                    <button class="btn btn-sm btn-light ml-2" data-toggle="modal" onClick={()=>handleSelectedSchedule(s)} data-target="#cancelScheduleModal"><i class="fa fa-close "></i></button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Add New Train Modal */}
            <div class="modal fade" id="addNewTrainModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document" >
                    <div class="modal-content modal-bg" >
                        <div class="modal-header modal-header-bg">
                            <h5 class="modal-title" id="exampleModalLongTitle">Add New Train</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">Train Code</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">Train Name</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control" />
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-dark">Add Train</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add new Schedule Modal */}
            <div class="modal fade" id="addNewSchedule" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document" >
                    <div class="modal-content modal-bg" >
                        <div class="modal-header modal-header-bg">
                            <h5 class="modal-title" id="exampleModalLongTitle">Add New Schedule</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">Train Name</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" value={selectedTrain != null && selectedTrain.trainName} readOnly className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">From</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" value={from} onChange={(e) => setfrom(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">To</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" value={to} onChange={(e) => setto(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">Departing at</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" value={departAt} onChange={(e) => setdepartAt(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">Arrival at</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" value={arrivalAt} onChange={(e) => setarrivalAt(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">Ticket Price</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" value={price} onChange={(e) => setprice(e.target.value)} className="form-control" />
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" id="sClose" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={handleAddSchedule} class="btn btn-dark">Add Schedule</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Update Schedule Modal */}
            <div class="modal fade" id="updateScheduleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document" >
                    <div class="modal-content modal-bg" >
                        <div class="modal-header modal-header-bg">
                            <h5 class="modal-title" id="exampleModalLongTitle">Update Schedule</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">Train Name</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" value={selectedSchedule != null && selectedSchedule.train.trainName} readOnly className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">From</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" value={from} onChange={(e) => setfrom(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">To</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" value={to} onChange={(e) => setto(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">Departing at</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" value={departAt} onChange={(e) => setdepartAt(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">Arrival at</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" value={arrivalAt} onChange={(e) => setarrivalAt(e.target.value)} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">Ticket Price</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" value={price} onChange={(e) => setprice(e.target.value)} className="form-control" />
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" id="updateScheduleCloseBtn" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={handleUpdateSchedule} class="btn btn-dark">Update Schedule</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cancel Schedule Modal */}
            <div class="modal fade" id="cancelScheduleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document" >
                    <div class="modal-content modal-bg" >
                        <div class="modal-header modal-header-bg">
                            <h5 class="modal-title" id="exampleModalLongTitle">Cancel Schedule</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to cancel schedule?
                        </div>
                        <div class="modal-footer">
                            <button type="button" id="cancelScheduleCloseBtn" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={handleCancelSchedule} class="btn btn-dark">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>

            

        </div>
    );
}

export default TrainManagementPage;