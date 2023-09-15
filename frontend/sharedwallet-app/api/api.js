import axios from 'axios';

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
}

export default ApiService;