import axios from 'axios';

const BACKEND_URL = "http://localhost:7211/api/";


/**
 * Rest Service APIs
 */
class RestService {


    register(userDto) {
        return axios.post(BACKEND_URL + 'Authentication/RegisterUser',userDto)
    }

    authenticateUser(username, password) {
        return axios.post(BACKEND_URL + 'Authentication/UserLogin',{userName:username, password:password})
    }


    addTrain(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'Train/addTrain',req, config)
    }


    getSchedulesByTrainId(token, code){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'Train/getSheduleByTrainId?TrainCode',{trainCode:code}, config)
    }


    getAllTrains(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.get(BACKEND_URL + 'Train/getAllTrain', config)
    }

    addSchedule(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'Train/addSchedule',req, config)
    }

    getAllUsers(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.get(BACKEND_URL + 'User/GetAllUsers', config)
    }

    deleteUserByNIC(token, id){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.delete(BACKEND_URL + 'User/deletAccountById?nic='+ id, config)
    }

    updateUserById(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'User/updateAccountById',req, config)
    }


    getAllReservations(token){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.get(BACKEND_URL + 'Ticket/getAllReservation', config)
    }

    getAllSchedules(token){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.get(BACKEND_URL + 'Train/getAllSchedule', config)
    }

    addReservation(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'Ticket/addReservation',req, config)
    }

    updateReservationById(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'Ticket/updateReservationById',req, config)
    }

    updateScheduleById(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'Train/updateScheduleById',req, config)
    }

    updateTrainById(token, req){
        const config = {
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.post(BACKEND_URL + 'Train/updateTrainById',req, config)
    }

}

export default new RestService();