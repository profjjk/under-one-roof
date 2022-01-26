import axios from 'axios';

const API_URL = '/api/auth/';

const register = (username, email, password) => {
    return axios.post(API_URL + 'signup', {
        username,
        email,
        password
    });
};

const login = (username, password) => {
    return axios
        .post(API_URL + 'signin', {
            username,
            password
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem('under_one_roof', JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('under_one_roof');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('under_one_roof'));
};

export default {
    register,
    login,
    logout,
    getCurrentUser
};