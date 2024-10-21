const express = require('express');
const router = express.Router();
const { isAdmin, authMiddleware } = require('../Middleware/authMiddlerware');
const { getDashboardStats } = require('../Controllers/dashboardController');

router.get('/stats', authMiddleware, isAdmin, getDashboardStats);

module.exports = router;
