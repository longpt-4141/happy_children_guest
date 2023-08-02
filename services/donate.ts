import axiosInterceptorInstance from "@/utils/axiosInterceptorInstance";
// axios.defaults.withCredentials = true;

import axios from 'axios'
const getBanksInfo = async () => {
    try {
        const response = await axios.get('https://api.vietqr.io/v2/banks'); // Replace with your API endpoint
  
        // Handle the response data here
        console.log(response.data);
        return response.data;
      } catch (error) {
        // Handle the error here
        console.error(error);
      }
}

const getQRCodeImage = async (amount: string, message: string, email: string) => {
    try {
        const response = await axios.post(
            'https://api.vietqr.io/v2/generate',
            {
                'accountNo': '1021681661',
                'accountName': 'PHAM THANH LONG',
                'acqId': '970436',
                'addInfo': `${email} - ${message} - CK Tu Thien HAPPY CHILDREN`,
                'amount': amount,
                'template': 'print'
            },
            {
                headers: {
                    // 'access-control-allow-origin' : '*',
                    'x-client-id': '54802ae1-44a1-4db7-abdc-856d884e87bb',
                    'x-api-key': '672fb495-22e6-4f3f-bf76-d345b35550be',
                    'Content-Type': 'application/json',
                },
            },
        );
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error);
    }
}

interface TransactionObj {
    username : string,
    email: string,
    address? : string ,
    phone_number?: string ,
    amount: number ,
    message?: string
}

const sendDonateTransaction = async (transaction : TransactionObj) => {
    try {
        const response = await axiosInterceptorInstance.post(
            '/transaction/make-new-donate',
            transaction,
        );
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error);
    }
}

const makeItemDonation = async (transaction : TransactionObj) => {
    try {
        const response = await axiosInterceptorInstance.post(
            '/transaction/guest-make-item-donation',
            transaction,
        );
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export {getBanksInfo, getQRCodeImage,sendDonateTransaction,makeItemDonation}