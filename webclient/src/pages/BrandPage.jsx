import React, { useEffect, useRef, useState } from "react";
import '../styles/common.css'
import RestService from "../services/RestService";
import { ToastContainer, toast } from 'react-toastify';

function BrandPage() {

    const [isLogged, setIsLogged] = useState(sessionStorage.getItem("isLogged"));
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [username, setUserName] = useState(sessionStorage.getItem("username"));
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
    const [relaod, setrelaod] = useState(false);

    const [brands, setbrands] = useState([]);
    const [selectedBrand, setselectedBrand] = useState([]);

    const [bid, setbid] = useState("");
    const [bName, setbName] = useState("");
    const [bCode, setbCode] = useState("");
    const [bCountry, setbCountry] = useState("");

    useEffect(() => {
        RestService.getAllBrands(token, {}).then(res => {
            setbrands(res.data.brandList)
        }).catch(err => {
            console.log(err);
        })
    }, [relaod]);

    function handleAddBrand(){
        const req = {
            brand:{
                brandName:bName,
                brandCode:bCode,
                originCountry:bCountry

            }
        }

        RestService.addBrand(token, req).then(res => {

            if (res.data.success) {
                setrelaod(true);
                toast.success('Brand Added Successfully!!', {
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
                toast.error("Failed to add the Brand", {
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
            toast.error("Failed to add the Brand", {
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

    function handleUpdateBrand(){
        const req = {
            brand:{
                id:bid,
                brandName:bName,
                brandCode:bCode,
                originCountry:bCountry

            }
        }

        RestService.updateBrandById(token, req).then(res => {

            if (res.data.success) {
                setrelaod(true);
                toast.success('Brand Updated Successfully!!', {
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
                toast.error("Failed to update the Brand", {
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
            toast.error("Failed to update the Brand", {
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

    function handleClearFields(){
        setbName("");
        setbCode("");
        setbCountry("");
    }

    function handleSelectedBrand(brand){
        setbName(brand.brandName);
        setbCode(brand.brandCode);
        setbCountry(brand.originCountry);
        setbid(brand.id);
    }

    




    return (
        <div className="row col-lg-12 customer" style={{ height: '100%', margin: '0', padding: '0' }}>
            <div className="col-lg-6  d-flex flex-column justify-content-center align-items-center">
                <div className="p-3" style={{ width: '80%' }}>
                    <h1 className="page-title">Brands</h1>
                    <div className="form-group">
                        <label htmlFor="" >Brand Name</label>
                        <input type="text" value={bName} onChange={(e)=>setbName(e.target.value)}  className='form-control' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Brand Code</label>
                        <input type="text" value={bCode} onChange={(e)=>setbCode(e.target.value)} className='form-control' />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Country of Origin</label>
                        <input type="text" value={bCountry} onChange={(e)=>setbCountry(e.target.value)} className='form-control' />
                    </div>

                    <div className="row d-flex  justify-content-center align-items-center">
                        <button className="btn btn-dark btn-lg m-3" onClick={handleAddBrand} style={{width:'20%'}} >Add</button>
                        <button className="btn btn-dark btn-lg m-3" onClick={handleUpdateBrand} style={{width:'20%'}}  >Edit</button>
                    </div>
                </div>

            </div>
            <div className="col-lg-6  d-flex flex-column mt-5 align-items-center">
                <table class="table table-dark table-hover" style={{backgroundColor:'rgb(0, 34, 29)'}}>
                    <thead>
                        <tr>

                            <th scope="col">Brand Name</th>
                            <th scope="col">Brand Code</th>
                            <th scope="col">Country of Origin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands != null &&
                            brands.map(
                                b => <tr onClick={(e)=>handleSelectedBrand(b)}>
                                    <td>{b.brandName}</td>
                                    <td>{b.brandCode}</td>
                                    <td>{b.originCountry}</td>
                                </tr>
                            )
                        }


                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default BrandPage;