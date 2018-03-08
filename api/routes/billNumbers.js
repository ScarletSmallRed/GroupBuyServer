const express = require('express');
const router = express.Router();
const BillNumberController = require('../controllers/billNumbers');
const checkAuth = require('../middleware/check-auth');

router.get('/', BillNumberController.billNumber_get);
router.post('/create', BillNumberController.billNumber_init);
router.patch('/:id', BillNumberController.billNumber_update);

module.exports = router;
