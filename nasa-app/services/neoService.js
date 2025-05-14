// services/neoService.js
import axios from 'axios';

const API_URL = 'https://ssd-api.jpl.nasa.gov/cad.api';

export const fetchNEOs = async (params) => {
  try {
    console.log('Requesting with params:', params); // Log the parameters
    const response = await axios.get(API_URL, { params });
    console.log('Response data:', response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error('Error fetching NEOs:', error.response ? error.response.data : error.message);
    return null;
  }
};
