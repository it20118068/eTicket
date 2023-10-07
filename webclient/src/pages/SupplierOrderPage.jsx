import React, { useEffect, useRef, useState } from "react";
import '../styles/common.css'
import RestService from "../services/RestService";
import { ToastContainer, toast } from 'react-toastify';

function SupplierOrderPage() {

    const [isLogged, setIsLogged] = useState(sessionStorage.getItem("isLogged"));
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [username, setUserName] = useState(sessionStorage.getItem("username"));
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
    const [relaod, setrelaod] = useState(false);

    const [items, setitems] = useState([]);
    const [orders, setorders] = useState([]);


    const [item, setitem] = useState([]);
    const [quantity, setquantity] = useState("");
    const [orderedDate, setorderedDate] = useState("");
    const [requiredDate, setrequiredDate] = useState("");



    useEffect(() => {
        RestService.getAllItems(token, {}).then(res => {
            setitems(res.data.itemList)
        }).catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        RestService.getAllSupplierOrders(token, {}).then(res => {
            setorders(res.data.supplierOrderList)
        }).catch(err => {
            console.log(err);
        })
    }, [relaod]);

    function handleAddSupplierOrder(){
        const req = {
            supplierOrder: {
                item: getItemById(item),
                quantity: quantity,
                orderedDate: orderedDate,
                requiredDate: requiredDate,
            }
        }
        console.log(req)
        RestService.addSupplierOrder(token, req).then(res => {

            if (res.data.success) {
                setrelaod(true);
                toast.success('Supplier Order Added Successfully!!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                handleClearFields();
            } else {
                toast.error("Failed to add the Supplier Order", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }).catch(err => {
            console.log(err);
            toast.error("Failed to add the Supplier Order", {
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

    function getItemById(id){
        for(let i of items){
            if(i.id == id){
                return i;
            }
        }
    }

    function getBrand(id){
        for(let i of items){
            if(i.id == id){
                return i.brand.brandName;
            }
        }
    }

    function formatDate(inputDateStr) {
        const inputDate = new Date(inputDateStr);
        const day = String(inputDate.getDate()).padStart(2, '0');
        const month = String(inputDate.getMonth() + 1).padStart(2, '0');
        const year = inputDate.getFullYear();

        return `${day}-${month}-${year}`;
    }



    function handleClearFields(){
        setitem("");
        setquantity("");
        setrequiredDate("");
        setorderedDate("");
    }

    return ( 
        <div className="row col-lg-12 customer" style={{ height: '100%', margin: '0', padding: '0' }}>
            <div className="col-lg-4  d-flex flex-column justify-content-center align-items-center">
                <div className="p-3" style={{ width: '80%' }}>
                    {/* <h1 className="page-title">Supplier Order</h1> */}
                    <div className="form-group">
                        <label htmlFor="" >Item ID</label>
                        <select class="form-control" aria-label="Default select example" value={item} onChange={(e) => setitem(e.target.value)}>
                            <option selected>Select Item</option>
                            {items != null && items.map(
                                i => <option value={i.id}>{getItemById(i.id).itemName}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Item Brand</label>
                        <input type="text" readOnly value={item != "" ? getBrand(item) :""} className='form-control' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Quantity</label>
                        <input type="text" value={quantity} onChange={(e) => setquantity(e.target.value)} className='form-control' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Ordered Date</label>
                        <input type="date" value={orderedDate} onChange={(e) => setorderedDate(e.target.value)} className='form-control' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Required Date</label>
                        <input type="date" value={requiredDate} onChange={(e) => setrequiredDate(e.target.value)} className='form-control' />
                    </div>

                    <div className="row d-flex  justify-content-center align-items-center">
                        <button className="btn btn-dark btn-lg m-3" onClick={handleAddSupplierOrder} style={{ width: '30%' }} >Update</button>
                    </div>
                </div>

            </div>
            <div className="col-lg-8  d-flex flex-column mt-5 align-items-center">
                <table class="table table-dark table-hover" style={{ backgroundColor: 'rgb(0, 34, 29)' }}>
                    <thead>
                        <tr>
                            <th scope="col">Supplier Order ID</th>
                            <th scope="col">Item ID</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Ordered Date</th>
                            <th scope="col">Required Date</th>
     
                        </tr>
                    </thead>
                    <tbody>
                        {orders != null &&
                            orders.map(
                                o => <tr>
                                    <td>{o.id}</td>
                                    <td>{o.item.id}</td>
                                    <td>{o.item.itemName}</td>
                                    <td>{o.item.brand.brandName}</td>
                                    <td>{o.quantity}</td>
                                    <td>{formatDate(o.orderedDate)}</td>
                                    <td>{formatDate(o.requiredDate)}</td>
                                </tr>
                            )
                        }


                    </tbody>
                </table>

            </div>
        </div>
     );
}

export default SupplierOrderPage;