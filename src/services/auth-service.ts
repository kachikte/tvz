import axios from 'axios';

const API_URL = 'https://tvzcore-d8e762e1f71a.herokuapp.com'; // Update with your actual API URL

const authService = {
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      console.log('This is the user token -- ', response.data.data.token);
      
      if (response.data.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      return response.data.data;
    } catch (error: any) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  register: async (user: any) => {
    try {
      const response = await axios.post(`${API_URL}/user/register`, user);
      console.log('THIS IS THE REGISTRATION DATA - ', response.data);
      
      return response.data;
    } catch (error: any) {
        console.log('THIS IS THE REGISTRATION ERROR - ', error);

      throw error;
    }
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user')!);
  },

};

export default authService;
