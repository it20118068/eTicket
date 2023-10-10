import React, { useEffect, useRef, useState } from "react";
import '../styles/common.css'
import RestService from "../services/RestService";
import { ToastContainer, toast } from 'react-toastify';
import { CommonStatus } from "../enums/CommonStatus.ts";

/**
 * Ticket Booking management page
 */
function TicketBookingManagementPage() {

    const [isLogged, setIsLogged] = useState(sessionStorage.getItem("isLogged"));
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
    const [reload, setreload] = useState(false);




    const [filteredList, setfilteredList] = useState([]);
    const [ticketsList, setticketsList] = useState([]);


    const [scheduleList, setscheduleList] = useState([]);
    const [selectedSchedule, setselectedSchedule] = useState([]);

    const [date, setdate] = useState('');
    const [noOfTickets, setnoOfTickets] = useState('');
    const [nic, setnic] = useState('');
    const [tot, settot] = useState('');
    const [selectedTicket, setselectedTicket] = useState([]);


    //Fetch tickets from the server
    useEffect(() => {
        RestService.getAllReservations(token).then(res => {
            setfilteredList(res.data.ticketDTOs);
            setticketsList(res.data.ticketDTOs);
        }).catch(err => {
            console.log(err);
        })
    }, [reload]);


    // Fetch schedules from the server
    useEffect(() => {
        RestService.getAllSchedules(token).then(res=>{
            setscheduleList(res.data.scheduleDTOs)
        }).catch(err => {
            console.log(err);
        })
    }, []);

    // Handle search ticket by NIC
    function handleSearch(value){
        let temp = [];

        for(let i of ticketsList){
            if(i.nic.startsWith(value)){
                temp.push(i);
            }
        }

        setfilteredList(temp);
    }

    // Set Selected Schedule by ID
    function handleSelectedSchedule(id){
        for(let s of scheduleList){
            if(s._id == id){
                setselectedSchedule(s)
            }
        }
    }

    // Handle make reservation
    function handleMakeReservation(){
        setreload(false);

        if(date == '' || noOfTickets =='' || nic =='' || tot ==''){
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

        const ticketDto = {
            _id:"",
            nic:nic,
            bookingDate:new Date(),
            reservationDate:date,
            noOfReservations:noOfTickets,
            schedule:selectedSchedule,
            totAmount:tot,
            status:0
        }

        RestService.addReservation(token,{ticketDto:ticketDto}).then(res=>{
            if (res.data.isSuccess == true) {
                toast.success('Successfully made the reservation', {
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
                document.getElementById('addBtnClose').click();
                setreload(true);
            }
        }).catch(err=>{
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
        setselectedSchedule([]);
        setdate('');
        setnoOfTickets('');
        setnic('');
        settot('');
    }


    // Handle cancel ticket
    function handleCancelTicket(){
        selectedTicket.status = 2;

        RestService.updateReservationById(token, {ticketDto:selectedTicket}).then(res=>{
            if (res.data.isSuccess == true) {
                toast.success('Reservation cancelled successfully', {
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
                document.getElementById('btnClose').click();
                setreload(true);
            }
        }).catch(err=>{
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

    // Handle set selecetd ticket
    function handleSetTicket(ticket){
        setdate(ticket.reservationDate);
        setnoOfTickets(ticket.noOfReservations);
        setnic(ticket.nic);
        settot(ticket.totAmount);
        setselectedTicket(ticket)
    }

    // Handle update reservation
    function handleUpdateReservation(){
        setreload(false);

        if(date == '' || noOfTickets =='' || nic =='' || tot ==''){
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

        selectedTicket.reservationDate = date;
        selectedTicket.schedule = selectedSchedule;
        selectedTicket.noOfReservations = noOfTickets;
        selectedTicket.nic = nic;
        selectedTicket.totAmount = tot;

        RestService.updateReservationById(token,{ticketDto:selectedTicket}).then(res=>{
            if (res.data.isSuccess == true) {
                toast.success('Successfully updated the reservation', {
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
                document.getElementById('updateCloseBtn').click();
                setreload(true);
            }
        }).catch(err=>{
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

    



    return (
        <div className="row page" style={{ height: '100%', margin: '0', padding: '0' }}>
            <div className="d-flex justify-content-center align-items-center page-main-title-box" style={{ margin: '0', padding: '0' }} >
                <h1 className="page-main-title">Ticket Booking Management</h1>
            </div>
            <div className="p-4" style={{ height: '85%', width: '100%' }}>
                <div className="row col-lg-12 p-3">
                    <div className="col-lg-6">
                        <input type="text" onChange={(e)=>handleSearch(e.target.value)} className="form-control" placeholder="Search" />
                    </div>
                    <div className="col-lg-6" >
                        <button className="btn btn-light  " data-toggle="modal" data-target="#makeReservationModal" style={{ float: 'right' }}>Make Reservation</button>
                    </div>
                </div>

                <div className="p-3">
                    <table class="table table-hover custom-table" style={{ color: 'white' }}>
                        <thead>
                            <tr>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Depart At</th>
                                <th scope="col">Arrival At</th>
                                <th scope="col">Train</th>
                                <th scope="col">NIC</th>
                                <th scope="col">No Of Reservations</th>
                                <th scope="col">Price (Rs.)</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {filteredList != null && filteredList.map(ticket =>
                                <tr>
                                    <td>{ticket.schedule.startPoint}</td>
                                    <td>{ticket.schedule.endPoint}</td>
                                    <td>{ticket.schedule.startingTime}</td>
                                    <td>{ticket.schedule.arrivalTime}</td>
                                    <td>{ticket.schedule.train.trainName}</td>
                                    <td>{ticket.nic}</td>
                                    <td>{ticket.noOfReservations}</td>
                                    <td>{ticket.totAmount}</td>
                                    <td>{CommonStatus[ticket.status]}</td>
                                    <td>
                                        <button class="btn btn-light ml-2 btn-sm" data-toggle="modal" data-target="#updateReservationModal" onClick={(e)=>{handleSetTicket(ticket);setselectedSchedule(ticket.schedule)}}><i class="fa fa-edit"></i></button>
                                        <button disabled={CommonStatus[ticket.status] != 'ACTIVE'} class="btn btn-light ml-2 btn-sm" data-toggle="modal" data-target="#cancelReservation" onClick={(e)=>{setselectedTicket(ticket)}}><i class="fa fa-close "></i></button>
                                    </td>
                                </tr>
                            )}


                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add New Reservation Modal */}
            <div class="modal fade" id="makeReservationModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document" >
                    <div class="modal-content modal-bg" >
                        <div class="modal-header modal-header-bg">
                            <h5 class="modal-title" id="exampleModalLongTitle">Make New Reservation</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">Schedule</label>
                                </div>
                                <div className="col-lg-10">
                                    <select class="form-select form-control" aria-label="Default select example" onChange={(e)=>handleSelectedSchedule(e.target.value)}>
                                        <option selected>Select Schedule</option>
                                        {scheduleList != null && scheduleList.map(s =>
                                            <option value={s._id}>{s.startPoint + " to " + s.endPoint + " | " + s.startingTime +" - "+ s.arrivalTime + " | " + s.train.trainName}</option>
                                        )}

                                    

                                    </select>
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">From</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" style={{backgroundColor:'#4a0061',color:'white'}} value={selectedSchedule.startPoint} className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">To</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" style={{backgroundColor:'#4a0061',color:'white'}} value={selectedSchedule.endPoint} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">Depart at</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" style={{backgroundColor:'#4a0061',color:'white'}} value={selectedSchedule.startingTime} className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">Arrival at</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" style={{backgroundColor:'#4a0061',color:'white'}} value={selectedSchedule.arrivalTime} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">Train</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" style={{backgroundColor:'#4a0061',color:'white'}} value={selectedSchedule.train && selectedSchedule.train.trainName} className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">Ticket Price (Rs.)</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" style={{backgroundColor:'#4a0061',color:'white'}} value={selectedSchedule.ticketPrice} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">Date</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="date" value={date} onChange={(e) => setdate(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">No of Tickets</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select form-control" value={noOfTickets} onChange={(e) => {setnoOfTickets(e.target.value);settot(parseInt(e.target.value) * selectedSchedule.ticketPrice)}} aria-label="Default select example">
                                        <option selected>Select no of tickets</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="3">4</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">NIC</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" value={nic} onChange={(e) => setnic(e.target.value)}  className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">Total Price (Rs.)</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" style={{backgroundColor:'#4a0061',color:'white'}} readOnly value={tot}  className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" id="addBtnClose" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-dark" onClick={handleMakeReservation}>Make Reservation</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cancel Reservation */}
            <div class="modal fade" id="cancelReservation" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content modal-bg">
                        <div class="modal-header modal-header-bg">
                            <h5 class="modal-title" id="exampleModalLongTitle">Cancel Reservation</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to cancel the reservation?
                        </div>
                        <div class="modal-footer">
                            <button type="button" id="btnClose" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-dark" onClick={handleCancelTicket}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Update Reservation Modal */}
            <div class="modal fade" id="updateReservationModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document" >
                    <div class="modal-content modal-bg" >
                        <div class="modal-header modal-header-bg">
                            <h5 class="modal-title" id="exampleModalLongTitle">Update Reservation</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">Schedule</label>
                                </div>
                                <div className="col-lg-10">
                                    <select class="form-select form-control" aria-label="Default select example" onChange={(e)=>handleSelectedSchedule(e.target.value)}>
                                        <option selected>Select Schedule</option>
                                        {scheduleList != null && scheduleList.map(s =>
                                            <option value={s._id}>{s.startPoint + " to " + s.endPoint + " | " + s.startingTime +" - "+ s.arrivalTime + " | " + s.train.trainName}</option>
                                        )}

                                    

                                    </select>
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">From</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" style={{backgroundColor:'#4a0061',color:'white'}} value={selectedSchedule.startPoint} className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">To</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" style={{backgroundColor:'#4a0061',color:'white'}} value={selectedSchedule.endPoint} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">Depart at</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" style={{backgroundColor:'#4a0061',color:'white'}} value={selectedSchedule.startingTime} className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">Arrival at</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" style={{backgroundColor:'#4a0061',color:'white'}} value={selectedSchedule.arrivalTime} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">Train</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" style={{backgroundColor:'#4a0061',color:'white'}} value={selectedSchedule.train && selectedSchedule.train.trainName} className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">Ticket Price (Rs.)</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" style={{backgroundColor:'#4a0061',color:'white'}} value={selectedSchedule.ticketPrice} className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">Date</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="date" value={date} onChange={(e) => setdate(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">No of Tickets</label>
                                </div>
                                <div className="col-lg-4">
                                    <select class="form-select form-control" value={noOfTickets} onChange={(e) => {setnoOfTickets(e.target.value);settot(parseInt(e.target.value) * selectedSchedule.ticketPrice)}} aria-label="Default select example">
                                        <option selected>Select no of tickets</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="3">4</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">NIC</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" value={nic} onChange={(e) => setnic(e.target.value)}  className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">Total Price (Rs.)</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" style={{backgroundColor:'#4a0061',color:'white'}} readOnly value={tot}  className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" id="updateCloseBtn" class="btn btn-secondary"  data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-dark"  onClick={handleUpdateReservation} disabled={CommonStatus[selectedTicket.status] != 'ACTIVE'}>Update Reservation</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default TicketBookingManagementPage;