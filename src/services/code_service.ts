import axiosInstance from './axios_service';

const API_URL = 'https://tvzcore-d8e762e1f71a.herokuapp.com/'; // Update with your actual API URL

const codeService = {


  runCode: async (code: any) => {

    try {
    const response = await axiosInstance.post(`${API_URL}/code/run`, code)
    console.log('THIS IS THE RUN CODE - ', response.data);
      
    return response.data;
    } catch(error: any) {
        console.error(error);
        throw error;
      }
  },



  submitCode: async (code: any, problemId: any, email: string) => {

    try {
    const response = await axiosInstance.post(`${API_URL}/code/submit`, {code, problemId, email})
    console.log('THIS IS THE SUBMIT CODE - ', response.data);
      
    return response.data;
    } catch(error: any) {
        console.error(error);
        throw error;
      }
  },

  getUserAttempt: async (email: any) => {

    try {
    const response = await axiosInstance.post(`${API_URL}/code/user-attempt`, {email: email})
    console.log('THIS IS THE GET ATTEMPTS - ', response.data);
      
    return response.data;
    } catch(error: any) {
        console.error(error);
        throw error;
      }
  },


  getAttempts: async () => {

    try {
    const response = await axiosInstance.get(`${API_URL}/adminattempts/attempts`)
    console.log('THIS IS THE GET ATTEMPTS - ', response.data);
      
    return response.data;
    } catch(error: any) {
        console.error(error);
        throw error;
      }
  },


};

export default codeService;
