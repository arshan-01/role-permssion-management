import { toast } from 'sonner';
import { toastStyles } from './toastStyles';

/**
 * Handle the response from an API request.
 * @param {Promise} request - The API request promise.
 * @param {Object} options - Additional options for handling the response.
 * @param {boolean} [options.showSuccessToast=true] - Whether to show the success toast.
 * @param {boolean} [options.showErrorToast=true] - Whether to show the error toast.
 * @returns {Promise} - The data from the successful request.
 * @throws {Error} - Throws error if request fails.
 */
const handleResponse = async (request, options = {}) => {
  const { showSuccessToast = true, showErrorToast = true } = options;

  try {
    const response = await request;
    console.log("🚀 ~ handleResponse ~ response:", response);

    // Conditionally display success toast
    if (showSuccessToast) {
      toast.success(response.data.message, {
        style: toastStyles.success,
      });
    }

    return response.data;
  } catch (error) {
    // Conditionally display error toast
    if (showErrorToast) {
      toast.error(`Error: ${error.response?.data?.message || 'Something went wrong'}`, {
        style: toastStyles.error,
      });
    }

    throw error;
  }
};

export default handleResponse;
