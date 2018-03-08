const express = require('express');
const router = express.Router();
const UserController = require('./../controllers/users')

router.post('/login', UserController.users_login)
router.post('/logout', UserController.users_logout)
router.get('/checkLogin', UserController.users_check_login)
router.get('/cartList', UserController.users_cart_list)
router.post('/cartEdit', UserController.users_cart_edit)
router.post('/cartDel', UserController.users_cart_del)
router.get('/infoList', UserController.users_info_list)
router.post('/delAddress', UserController.users_address_del)
router.post('/addOrder', UserController.users_order_add_to_bills)
router.post('/addOrderToUsers', UserController.users_order_add_to_users)
router.post('/edituserInfo', UserController.users_edit_user_info)

module.exports = router