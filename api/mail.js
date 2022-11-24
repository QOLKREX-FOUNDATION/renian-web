import axios from 'axios';


const mailApi = axios.create({
    baseURL: "https://api.renian.pe/api/request-register",
})


export default mailApi;