import axios from 'axios';


// const BASE_URI = 'http://10.104.248.147:8000';
const BASE_URI = 'http://10.94.248.91:8000';

// uvicorn backend.routers.main:app --host 10.104.248.147 --port 8000 --reload

export class ApiService {
    static async getAllScreens() {
        try {
            const response = await axios.get(`${BASE_URI}/users/all-users`);
            return response.data;
        } catch (error) {
            console.error("Error fetching all users :", error);
            throw error;
        }
    }
    static async getUserByUserId(id) {
        try {
            const idval = parseInt(id,10);
            const api = `${BASE_URI}/users/get-user-by-id/${idval}`
            console.log(api);
            const response = await axios.get(api);
            return response.data;
        } catch (error) {
            console.error("Error fetching user :", error);
            throw error;
        }
    }

    static async getWalletBalanceByUserId(id) {
        try {
            const idval = parseInt(id,10);
            const api = `${BASE_URI}/wallet/get-balance_for_user/${idval}`
            console.log(api);
            const response = await axios.get(api);
            console.log('Wallet balanace is: ')
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching wallet :", error);
            throw error;
        }
    }
    static async addMoneyToPersonalWallet(userId,amount) {
        try {
            const uId = parseInt(userId,10);
            const amounttobeAdded = parseFloat(amount);
            const api = `${BASE_URI}/wallet/add_money_to_personal_wallet/?user_id=${uId}&balance=${amounttobeAdded}`;
            console.log(api);
            const response = await axios.post(api);
            return true;
        } catch (error) {
            console.error("Error adding money to wallet :", error);
            throw error;
        }
    }
    static async getUpisForUserId(userId) {
        try {
            const uId = parseInt(userId,10);
            const api = `${BASE_URI}/users/all-upis/${uId}`;
            console.log(api);
            const response = await axios.get(api);
            return response.data;
        } catch (error) {
            console.error("Error fetching user upis :", error);
            throw error;
        }
    }
    static async getGroupsForUserId(userId) {
        try {
            const uId = parseInt(userId,10);
            const api = `${BASE_URI}/users/all-groups/${uId}`;
            console.log(api);
            const response = await axios.get(api);
            return response.data;
        } catch (error) {
            console.error("Error fetching user groups :", error);
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
              console.log("From Auth Service");
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
        // Not Implemented
        return -1;
    }
}


