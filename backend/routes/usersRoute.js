const express = require('express');
const router = express.Router({mergeParams:true});

const {
    newUser,
    loginUser,
    getUserDetails,
    editUser,
    getUsers,
    verifyUser
} = require('../controllers/usersController');

router.route('/:id')
.get(verifyUser, getUserDetails)
.put(verifyUser, editUser);

router.post('/login', loginUser);

router.route('/')
.get(getUsers)
.post(newUser);

module.exports = router;