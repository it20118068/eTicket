import React, { useEffect, useRef, useState } from "react";
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';
import '../styles/navbar.css';

function NavBar() {
    return (
        <div className="col-lg-2 side-nav "style={{ height: '100%', margin: '0%', overflow:'hidden', padding:'0' }}>
            <div className="d-flex flex-column justify-content-center align-items-center title-box " style={{height:'20%'}}>
                <h1 className="nav-title">eTicket</h1>
            </div>

            <div className="d-flex  justify-content-center " style={{margin: '0%', height:'80%'}}>
                <nav className="nav flex-column " style={{width:'100%'}}>
                    {/* <NavLink exact to="/ee" className="nav-link main-nav-link" activeClassName="active-link" style={{width:'100%'}}>User Management</NavLink> */}
                    <NavLink exact to="/travelerManagement" className="nav-link main-nav-link " activeClassName="active-link">Traveler Management</NavLink>
                    <NavLink exact to="/ticketManagement" className="nav-link main-nav-link " activeClassName="active-link">Ticket Booking Management</NavLink>
                    <NavLink exact to="/trainManagement" className="nav-link main-nav-link " activeClassName="active-link">Train Management</NavLink>
                    <NavLink exact to="/brand2" className="nav-link main-nav-link " activeClassName="active-link">View Profile</NavLink>
                    <NavLink exact to="/brand2" className="nav-link main-nav-link " activeClassName="active-link">Logout</NavLink>
                </nav>
            </div>
        </div>
    );
}

export default NavBar;