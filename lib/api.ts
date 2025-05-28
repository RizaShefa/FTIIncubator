import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const fetchProjects = async () => {
  const response = await axios.get(`${API_URL}/projects`);
  
  return response.data;
};



export const successStoriess = async () => {
  const response = await axios.get(`${API_URL}/successStories`);
  
  return response.data;
};