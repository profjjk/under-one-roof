import axios from 'axios';

export default {
    getExpenses: function (id) {
        return axios.get('/api/expenses/' + id);
    },
    deleteExpense: function (id) {
        return axios.delete('/api/expenses/' + id);
    },
    addExpense: function (expenseData) {
        return axios.post('/api/expenses', expenseData);
    },
    editExpense: function (id, expenseData) {
        return axios.put('/api/expenses/' + id, expenseData);
    },
    getChores: function (id) {
        return axios.get('/api/chores/' + id);
    },
    removeChore: function (id) {
        return axios.delete('/api/chores/' + id);
    },
    addChore: function (newChore) {
        return axios.post('/api/chores', newChore);
    },
    updateChore: function (id) {
        return axios.put('/api/chores/update/' + id);
    },
    getEvents: id => {
        return axios.get('/api/events/' + id);
    },
    saveEvent: data => {
        return axios.post('/api/events', data);
    },
    deleteEvent: id => {
        return axios.delete('/api/events/' + id);
    },
    getUsers: id => {
        return axios.get('/api/users/' + id);
    },
    saveUser: data => {
        return axios.post('/api/users', data);
    },
    deleteUser: id => {
        return axios.delete('/api/users/' + id);
    },
    getHome: id => {
        return axios.get('api/homes/' + id);
    },
    addHome: data => {
        return axios.get('/api/homes/' + data.HomeId);
    }
};
