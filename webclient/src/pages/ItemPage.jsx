import React, { useEffect, useRef, useState } from "react";
import '../styles/common.css'
import RestService from "../services/RestService";
import { ToastContainer, toast } from 'react-toastify';

function ItemPage() {
    const [isLogged, setIsLogged] = useState(sessionStorage.getItem("isLogged"));
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [username, setUserName] = useState(sessionStorage.getItem("username"));
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
    const [relaod, setrelaod] = useState(false);

    const [brands, setbrands] = useState([]);
    const [selectedBrand, setselectedBrand] = useState([]);
    const [items, setitems] = useState([]);

    const [id, setid] = useState("");
    const [iName, setiName] = useState("");
    const [iCode, setiCode] = useState("");
    const [brand, setbrand] = useState([]);
    const [price, setprice] = useState("");
    const [qty, setqty] = useState("");

    useEffect(() => {
        RestService.getAllItems(token, {}).then(res => {
            setitems(res.data.itemList)
        }).catch(err => {
            console.log(err);
        })
    }, [relaod]);

    useEffect(() => {
        RestService.getAllBrands(token, {}).then(res => {
            setbrands(res.data.brandList)
        }).catch(err => {
            console.log(err);
        })
    }, []);

    function handleAddItem() {
        const req = {
            item: {
                itemName: iName,
                itemCode: iCode,
                brand: getBrandById(brand),
                sellingPrice: price,
                quantity: qty,
            }
        }



        RestService.addItem(token, req).then(res => {

            if (res.data.success) {
                setrelaod(true);
                toast.success('Item Added Successfully!!', {
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
                toast.error("Failed to add the Item", {
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
            toast.error("Failed to add the Item", {
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

    function handleUpdateItem() {
        const req = {
            item: {
                id: id,
                itemName: iName,
                itemCode: iCode,
                brand: getBrandById(brand),
                sellingPrice: price,
                quantity: qty,
            }
        }

        RestService.addItem(token, req).then(res => {

            if (res.data.success) {
                setrelaod(true);
                toast.success('Item Updated Successfully!!', {
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
                toast.error("Failed to update the Item", {
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
            toast.error("Failed to update the Item", {
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

    function handleClearFields() {
        setiName("");
        setiCode("");
        setbrand("");
        setprice("");
        setqty("");
    }

    function handleSelectedItem(item) {
        setiName(item.itemName);
        setiCode(item.itemCode);
        setbrand(item.brand.id);
        setprice(item.sellingPrice);
        setqty(item.quantity);
        setid(item.id)
    }

    function getBrandById(id){
        for(let b of brands){
            if(b.id == id){
                return b;
            }
        }
    }

    return (
        <div className="row col-lg-12 customer" style={{ height: '100%', margin: '0', padding: '0' }}>
            <div className="col-lg-6  d-flex flex-column justify-content-center align-items-center">
                <div className="p-3" style={{ width: '80%' }}>
                    {/* <h1 className="page-title">Items</h1> */}
                    <div className="form-group">
                        <label htmlFor="" >Item Name</label>
                        <input type="text" value={iName} onChange={(e) => setiName(e.target.value)} className='form-control' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Item Code</label>
                        <input type="text" value={iCode} onChange={(e) => setiCode(e.target.value)} className='form-control' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Brand</label>
                        {/* <input type="text" value={brand} onChange={(e) => setbrand(e.target.value)} className='form-control' /> */}
                        <select class="form-control" aria-label="Default select example" value={brand} onChange={(e) => setbrand(e.target.value)}>
                            <option selected>Select Brand</option>
                            {brands != null && brands.map(
                                b => <option value={b.id}>{getBrandById(b.id).brandName}</option>
                            )}


                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Selling Price</label>
                        <input type="text" value={price} onChange={(e) => setprice(e.target.value)} className='form-control' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Quantity</label>
                        <input type="text" value={qty} onChange={(e) => setqty(e.target.value)} className='form-control' />
                    </div>

                    <div className="row d-flex  justify-content-center align-items-center">
                        <button className="btn btn-dark btn-lg m-3" onClick={handleAddItem} style={{ width: '20%' }} >Add</button>
                        <button className="btn btn-dark btn-lg m-3" onClick={handleUpdateItem} style={{ width: '20%' }}  >Edit</button>
                    </div>
                </div>

            </div>
            <div className="col-lg-6  d-flex flex-column mt-5 align-items-center">
                <table class="table table-dark table-hover" style={{ backgroundColor: 'rgb(0, 34, 29)' }}>
                    <thead>
                        <tr>

                            <th scope="col">Item Name</th>
                            <th scope="col">Item Code</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Selling Price</th>
                            <th scope="col">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items != null &&
                            items.map(
                                i => <tr onClick={(e) => handleSelectedItem(i)}>
                                    <td>{i.itemName}</td>
                                    <td>{i.itemCode}</td>
                                    <td>{i.brand.brandName}</td>
                                    <td>{i.sellingPrice}</td>
                                    <td>{i.quantity}</td>

                                </tr>
                            )
                        }


                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default ItemPage;