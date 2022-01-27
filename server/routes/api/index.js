const router = require('express').Router();

const userRoutes = require('./users');
const eventRoutes = require('./events');
const expenseRoutes = require('./expenses');
const choreRoutes = require('./chores');
const authRoutes = require('./auth');
const homeRoutes = require('./home');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/expenses', expenseRoutes);
router.use('/chores', choreRoutes);
router.use('/auth', authRoutes);
router.use('/home', homeRoutes);

module.exports = router;