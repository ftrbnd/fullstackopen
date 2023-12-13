import axios from 'axios';
const baseUrl = '/api/users';

const getAllUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createUser = async (newUser) => {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
};

const updateUser = async (newUser) => {
  const response = await axios.put(`${baseUrl}/${newUser.id}`, newUser);
  return response.data;
};

const deleteUser = async (user) => {
  const response = await axios.delete(`${baseUrl}/${user.id}`);
  return response.data;
};

export { getAllUsers, getUser, createUser, updateUser, deleteUser };
