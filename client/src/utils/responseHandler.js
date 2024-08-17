// src/utils/responseHandler.js
import { toast } from 'react-hot-toast';
import { toastStyles } from './toastStyles';

/**
 * Handle the response from an API request.
 * @param {Promise} request - The API request promise.
 * @returns {Promise} - The data from the successful request.
 * @throws {Error} - Throws error if request fails.
 */
const handleResponse = async (request) => {
  try {
    const response = await request;
    console.log("🚀 ~ handleResponse ~ response:", response)
    toast.success(response.data.message,{
        style: toastStyles.success,
    });
    return response.data;
  } catch (error) {
    toast.error(`Error: ${error.response?.data?.message || 'Something went wrong'}`,{
        style: toastStyles.error,
    });
    throw error;
  }
};

export default handleResponse;
