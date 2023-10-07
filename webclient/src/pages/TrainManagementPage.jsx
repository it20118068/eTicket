function TrainManagementPage() {
    return ( 
        <div className="row page" style={{ height: '100%', margin: '0', padding: '0' }}>
            <div className="d-flex justify-content-center align-items-center page-main-title-box" style={{ margin: '0', padding: '0' }} >
                <h1 className="page-main-title">Train Management</h1>
            </div>
            <div className="p-4" style={{ height: '85%', width: '100%' }}>
                <div className="row col-lg-12 p-3">
                    <div className="col-lg-6">
                        <input type="text" className="form-control" placeholder="Search" />
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
                            <tr>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td> 
                                    <button class="btn btn-light" data-toggle="modal" data-target="#viewTrainSchedulesModal"><i class="fa fa-list "></i></button>
                                    <button class="btn btn-light ml-2" data-toggle="modal" data-target="#addNewSchedule"><i class="fa fa-plus "></i></button>
                                </td>
                                <td>
                                    <button class="btn btn-light ml-2"><i class="fa fa-edit "></i></button>
                                    <button class="btn btn-light ml-2" data-toggle="modal" data-target="#cancelTrain"><i class="fa fa-close "></i></button>
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
                            Are you sure you want to cancel train?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-dark">Confirm</button>
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

            {/* View Train Schedules Modal */}
            <div class="modal fade" id="viewTrainSchedulesModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document" >
                    <div class="modal-content modal-bg" >
                        <div class="modal-header modal-header-bg">
                            <h5 class="modal-title" id="exampleModalLongTitle">Train Schedules - Udarata Manike</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
                            <tr>
                                <td>Colombo</td>
                                <td>Kandy</td>
                                <td>08.00AM</td>
                                <td>02.00PM</td>
                                <td>ACTIVE</td>
                                <td>Rs.1500</td>
                                <td>
                                    <button class="btn btn-light ml-2"><i class="fa fa-edit "></i></button>
                                    <button class="btn btn-light ml-2" data-toggle="modal" data-target="#cancelTrain"><i class="fa fa-close "></i></button>
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
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">From</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">To</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">Departing at</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">Arrival at</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="row col-lg-12 d-flex align-items-center mt-3 ">
                                <div className="col-lg-4">
                                    <label htmlFor="">Ticket Price</label>
                                </div>
                                <div className="col-lg-8">
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-dark">Add Schedule</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
     );
}

export default TrainManagementPage;