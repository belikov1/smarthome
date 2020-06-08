const axios = require('axios');

const publicRequest = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    contentType: 'application/json',
  },
});

//TODO
const token = localStorage.getItem('token');

const authRequest = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    contentType: 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

module.exports = { publicRequest, authRequest };
