import axiosInstance from './axios_service';

const API_URL = 'http://localhost:4000'; // Update with your actual API URL

const codeService = {


  runCode: async (code: any) => {

    try {
    const response = await axiosInstance.post(`${API_URL}/code/run`, code)
    console.log('THIS IS THE REGISTRATION DATA - ', response.data);
      
    return response.data;
    } catch(error: any) {
        console.error(error);
        throw error;
      }
  },

};

export default codeService;
