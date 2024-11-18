const express = require('express');
const Router = express.Router();
const handleAdminLogin = require('../Controllers/Admin_login');
const createUser = require('../Controllers/createadmin');
const verify = require('../middleware/verify')

Router.post('/admin-login', handleAdminLogin)
Router.post('/create-admin', createUser)

module.exports = Router;