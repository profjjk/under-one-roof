import axios from "axios";

export default {
  // Gets all expenses
  getExpenses: function(id) {
    return axios.get("/api/expenses/" + id);
  },
  // Deletes the expense with the given id
  deleteExpense: function(id) {
    return axios.delete("/api/expenses/" + id);
  },
  // Saves a new expense to the database
  addExpense: function(expenseData) {
    console.log(expenseData);
    return axios.post("/api/expenses", expenseData);
  },
  editExpense: function(id, expenseData) {
    console.log(expenseData);
    return axios.put("/api/expenses/" + id, expenseData);
  },

  // Gets all chores
  getChores: function(id) {
    return axios.get("/api/chores/" + id);
  },
  // Deletes the chore with the given id
  removeChore: function(id) {
    return axios.delete("/api/chores/" + id);
  },
  // Saves a new chore
  addChore: function(newChore) {
    return axios.post("/api/chores", newChore);
  },
  // Update a chore with the given id
  updateChore: function(id) {
    return axios.put("/api/chores/update/" + id);
  },

  // EVENTS
  getEvents: id => {
    return axios.get('/api/events/' + id);
  },
  saveEvent: data => {
    return axios.post('/api/events', data);
  },
  deleteEvent: id => {
    return axios.delete('/api/events/' + id);
  },

  // USERS
  getUsers: id => {
    return axios.get('/api/users/' + id);
  },
  saveUser: data => {
    return axios.post('/api/users', data);
  },
  deleteUser: id => {
    return axios.delete('/api/users/' + id);
  },

  // LOGIN
  getUser: id => {
    return axios.get('api/homes/' + id);
  },
  addUser: data => {
    return axios.get('/api/homes/' + data.HomeId);
  }

};
