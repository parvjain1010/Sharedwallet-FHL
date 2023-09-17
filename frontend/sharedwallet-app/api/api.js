import axios from 'axios';

// uvicorn backend.routers.main:app --host 192.168.29.84 --port 8000 --reload

const BASE_URI = 'http://192.168.29.84:8000';
// const BASE_URI = 'http://10.94.248.91:8000';


export class ApiService {

    // User APIs
    static async getAllUsers() {
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

    static async getWalletForUserId(userId) {

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

    // Group APIs
    static async createGroup(userId, name, description, expense_type, budget) {
        try {
            const query_uri = `${BASE_URI}/groups/create-group/?user_id=${userId}`;
            const response = await axios.post(query_uri, {
                name: name,
                description, description,
                budget: budget,
                expense_type: expense_type
            });
            console.log(JSON.stringify(response.data));
            return response.data.id;
        }
        catch (err) {
            console.error("Error creating group");
            throw err;
        }
    }

    static async getGroupByGroupId(groupId) {
        try {
            const query_uri = `${BASE_URI}/groups/get-group/${groupId}`;
            const response = await axios.get(query_uri);
            return response.data;
        }
        catch (err) {
            console.error(`Error getting group from group id : ${groupId}`, err);
            throw err;
        }
    }

    static async getGroupMembersByGroupId(groupId) {
        try {
            const query_uri = `${BASE_URI}/groups/get-group-members/${groupId}`;
            const response = await axios.get(query_uri);
            console.log("api.js : getting group members")
            return response.data
        }
        catch (err) {
            console.error(`Error getting group from group id : ${groupId}`, err);
            throw err;
        }   
    }

    static async getGroupWalletByGroupId(groupId) {
        try {
            const query_uri = `${BASE_URI}/wallet/get-group-wallet/${groupId}`;
            const response = await axios.get(query_uri);
            return response.data
        }
        catch (err) {
            console.error(`Error getting group from group id : ${groupId}`, err);
            throw err;
        }        
    }

    // Deposits APIs
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

    static async addMoneyToGroupWallet(groupId,userId,amount) {

    }

    static async addMoneyToWallet(walletId,userId,amount) {

    }
    
    // Expenses/Payments APIs
    static async addGroupExpense(expenseTitle, amount, transactionDate, usersInvolved, splits, groupId, userId) {
        try {
            const query_uri = `${BASE_URI}/groups/make-payment/${groupId}/${userId}`;
            const response = await axios.post(query_uri, {
                    amount: amount,
                    title: expenseTitle,
                    transaction_date: transactionDate,
                    users: usersInvolved,
                    splits: splits
            });
            return response.data
        }
        catch (err) {
            console.error(`Error getting group from group id : ${groupId}`, err);
            throw err;
        }
    }
    
    // Transactions API
    static async getTransactionsForGroup(groupId) {

    }

    static async getIncomingTransactionsForUser(userId) {
        try {
            const uId = parseInt(userId,10);
            const api = `${BASE_URI}/transactions/incoming-transactions-user/${uId}`;
            console.log(api);
            const response = await axios.get(api);
            return response.data;
        } catch (error) {
            console.error("Error fetching incoming user transactions :", error);
            throw error;
        }
    }

    static async getOutgoingTransactionsForUser(userId) {
        try {
            const uId = parseInt(userId,10);
            const api = `${BASE_URI}/transactions/outgoing-transactions-user/${uId}`;
            console.log(api);
            const response = await axios.get(api);
            return response.data;
        } catch (error) {
            console.error("Error fetching outgoing user transactions :", error);
            throw error;
        }
    }

    static async getIncomingTransactionsForGroup(groupId) {
        try {
            const uId = parseInt(groupId,10);
            const api = `${BASE_URI}/transactions/incoming-transactions-group/${uId}`;
            console.log(api);
            const response = await axios.get(api);
            return response.data;
        } catch (error) {
            console.error("Error fetching incoming group transactions :", error);
            throw error;
        }
    }

    static async getOutgoingTransactionsForGroup(groupId) {
        try {
            const uId = parseInt(groupId,10);
            const api = `${BASE_URI}/transactions/outgoing-transactions-group/${uId}`;
            console.log(api);
            const response = await axios.get(api);
            return response.data;
        } catch (error) {
            console.error("Error fetching outgoing group transactions :", error);
            throw error;
        }
    }
    static async makePaymentViaGroup(group_id,transactionDetails, amount,user_id) {
        try {
            const gId = parseInt(group_id,10);
            const uId = parseInt(user_id,10);
            const amounttotransact = parseFloat(amount);
            const api = `${BASE_URI}/wallet/make-payment-group/?group_id=${gId}&transaction=${transactionDetails}&amount=${amounttotransact}&user_id=${uId}`;
            console.log(api);
            const response = await axios.post(api);
            return true;
        } catch (error) {
            console.error("Error adding group transaction:", error);
            throw error;
        }
    }

    static async makePaymentViaUser(userId,transactionDetails, amount) {
        try {
            const uId = parseInt(userId,10);
            const amounttotransact = parseFloat(amount);
            const api = `${BASE_URI}/wallet/make-payment-user/?user_id=${uId}&transaction=${transactionDetails}&amount=${amounttotransact}`;
            console.log(api);
            const response = await axios.post(api);
            return true;
        } catch (error) {
            console.error("Error adding user transaction :", error);
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


