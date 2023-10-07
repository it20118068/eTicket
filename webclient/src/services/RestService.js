import axios from 'axios';

const BACKEND_URL = "http://localhost:8885/YardManagmentBackend/";

class RestService {


    register(userDto) {
        return axios.post(BACKEND_URL + 'register',userDto)
    }

    authenticateUser(username, password) {
        return axios.post(BACKEND_URL + 'authenticate',{username:username, password:password})
    }


    getAllBrands(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'brand/getAllBrands',req, config)
    }

    addBrand(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'brand/addBrand',req, config)
    }

    updateBrandById(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'brand/updateBrandById',req, config)
    }

    getAllItems(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'item/getAllItems',req, config)
    }

    addItem(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'item/addItem',req, config)
    }

    updateItemById(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'item/updateItemById',req, config)
    }

    getAllSupplierOrders(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'supplierOrder/getAllSupplierOrders',req, config)
    }

    addSupplierOrder(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'supplierOrder/addSupplierOrder',req, config)
    }

    




}

export default new RestService();