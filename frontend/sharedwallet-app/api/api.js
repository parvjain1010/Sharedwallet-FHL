import axios from 'axios';

const ipAddress = '10.104.249.235:8000'

class ApiService {
    static async getAllUsers() {
        try {
            const response = await axios.get('http://10.104.251.13:8000/users/all-users');
            return response.data    ;
        } catch (error) {
            console.error("Error fetching all users :", error);
            throw error;
        }
    }
    static async getUserByUserId(id) {
        try {
            const idval = parseInt(id,10);
            const api = `http://${ipAddress}/users/get-user-by-id/${idval}`
            console.log(api);
            const response = await axios.get(api);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching user :", error);
            throw error;
        }
    }
}

export default ApiService;