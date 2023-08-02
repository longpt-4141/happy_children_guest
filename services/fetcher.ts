import axiosInterceptorInstance from "@/utils/axiosInterceptorInstance";


const fetchTransaction = async (url : string) => {
    try {
        const response = await axiosInterceptorInstance.get(
            url,
        );
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export {fetchTransaction}