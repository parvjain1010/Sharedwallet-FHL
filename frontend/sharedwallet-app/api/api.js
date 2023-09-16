import axios from 'axios';


const BASE_URI = 'http://10.104.251.13:8000';
export class ApiService {
    static async getAllUsers() {
        try {
            const response = await axios.get(`${BASE_URI}/users/all-users`);
            return response.data;
        } catch (error) {
            console.error("Error fetching all users :", error);
            throw error;
        }
    }
}

export class AuthService {
    static async login(user_email, user_password) {
        
        try {
            const response = await axios.post(`${BASE_URI}/users/authorise-user`, {
                email: user_email,
                password: user_password
              });
              console.log(response.data)
              return response.data
        }
        catch (err) {
            console.error("Error authorizing user");
            throw err;
        }
    }

    static async register(name, email, password, phone) {
        try {
            const response = await axios.post(`${BASE_URI}/users/create-users`, {
                email: email,
                name: name,
                phone_number: phone,
                password: password
              });
              console.log(response.data)
              console.log(response.data.id)
              return response.data.id
        }
        catch (err) {
            console.error("Error registering user");
            throw err;
        }
    }

    static async logout(user_id) {
        return -1;
        // Not Implemented
    }
}


