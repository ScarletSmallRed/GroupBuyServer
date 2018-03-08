const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ClerkController = require('../controllers/clerks');

router.get('/', checkAuth, ClerkController.clerks_get_all);
router.get('/search/:keyWord', checkAuth, ClerkController.clerks_search_clerk);
router.get('/:clerkId', checkAuth, ClerkController.clerks_get_clerk);
router.post('/create', checkAuth, ClerkController.clerks_create_clerk);
router.post('/login', ClerkController.clerks_login_clerk);
router.patch('/:clerkId', checkAuth, ClerkController.clerks_update_clerk);
router.delete('/:clerkId', checkAuth, ClerkController.clerks_delete_clerk);

module.exports = router;
