import axios from 'axios';

const instance = axios.create({
    baseURL: "https://hackathon-module-planner-default-rtdb.firebaseio.com/"
})

export default instance;