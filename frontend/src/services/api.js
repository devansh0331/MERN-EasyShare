import axios from "axios";

const API_URL = 'https://easy-share-pq41.onrender.com'

export const uploadfile = async (data) => {
    try{
        let response = await axios.post(`${API_URL}/upload`,data)
        return response.data
    } 
    catch(err){
        console.log();
    }

}