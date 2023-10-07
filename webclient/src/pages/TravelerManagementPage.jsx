import React, { useEffect, useRef, useState } from "react";
import '../styles/common.css'
import RestService from "../services/RestService";
import { ToastContainer, toast } from 'react-toastify';

function TravelerManagementPage() {
    return (
        <div className="row page" style={{ height: '100%', margin: '0', padding: '0' }}>
            <div className="d-flex justify-content-center align-items-center page-main-title-box" style={{ margin: '0', padding: '0' }} >
                <h1 className="page-main-title">Traveler Management</h1>
            </div>
            <div className="p-4" style={{ height: '85%', width: '100%' }}>
                <div className="row col-lg-12 p-3">
                    <div className="col-lg-6">
                        <input type="text" className="form-control" placeholder="Search NIC" />
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
                                <th className="d-flex justify-content-center align-items-center" scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <td>ACTIVE</td>
                                <td className="d-flex justify-content-center align-items-center">
                                    <button class="btn btn-light" data-toggle="modal" data-target="#deleteModal"><i class="fa fa-trash"></i></button>
                                    <button class="btn btn-light ml-2"><i class="fa fa-edit "></i></button>
                                    <button class="btn btn-light ml-2"><i class="fa fa-pause "></i></button>
                                    <button class="btn btn-light ml-2"><i class="fa fa-play "></i></button>
                                </td>

                            </tr>
                            <tr>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
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
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">Last Name</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">NIC</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">Mobile</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">Username</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">Email</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-2">
                                    <label htmlFor="">Password</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-lg-2">
                                    <label htmlFor="">Re-Password</label>
                                </div>
                                <div className="col-lg-4">
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-dark">Create Profile</button>
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
                            Are you sure you want to delete Shashika?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-dark">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default TravelerManagementPage;