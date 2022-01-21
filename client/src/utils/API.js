import axios from "axios";

const baseUrl = 'https://under-one-roof-server.herokuapp.com'

export default {
  // Gets all expenses
  getExpenses: function(id) {
    return axios.get(`${baseUrl}/api/expenses/` + id);
  },
  // Deletes the expense with the given id
  deleteExpense: function(id) {
    return axios.delete(`${baseUrl}/api/expenses/` + id);
  },
  // Saves a new expense to the database
  addExpense: function(expenseData) {
    return axios.post(`${baseUrl}/api/expenses`, expenseData);
  },
  editExpense: function(id, expenseData) {
    return axios.put(`${baseUrl}/api/expenses/` + id, expenseData);
  },

  // Gets all chores
  getChores: function(id) {
    return axios.get(`${baseUrl}/api/chores/` + id);
  },
  // Deletes the chore with the given id
  removeChore: function(id) {
    return axios.delete(`${baseUrl}/api/chores/` + id);
  },
  // Saves a new chore
  addChore: function(newChore) {
    return axios.post(`${baseUrl}/api/chores`, newChore);
  },
  // Update a chore with the given id
  updateChore: function(id) {
    return axios.put("${baseUrl}/api/chores/update/" + id);
  },

  // EVENTS
  getEvents: id => {
    return axios.get(`${baseUrl}/api/events/` + id);
  },
  saveEvent: data => {
    return axios.post(`${baseUrl}/api/events`, data);
  },
  deleteEvent: id => {
    return axios.delete(`${baseUrl}/api/events/` + id);
  },

  // USERS
  getUsers: id => {
    return axios.get(`${baseUrl}/api/users/` + id);
  },
  saveUser: data => {
    return axios.post(`${baseUrl}/api/users`, data);
  },
  deleteUser: id => {
    return axios.delete(`${baseUrl}/api/users/` + id);
  },

  // LOGIN
  getUser: id => {
    return axios.get(`${baseUrl}api/homes/` + id);
  },
  addUser: data => {
    return axios.get(`${baseUrl}/api/homes/` + data.HomeId);
  }

};
