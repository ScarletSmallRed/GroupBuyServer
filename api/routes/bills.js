const express = require('express');
const router = express.Router();
const BillController = require('../controllers/bills');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, BillController.bills_get_all);
router.post('/create', BillController.bills_create_bill);
router.get('/:billId', BillController.bills_get_bill);
router.patch('/:billId', BillController.bills_update_bill);
router.delete('/:billId', checkAuth, BillController.bills_delete_bill);
router.post('/search', checkAuth, BillController.bills_search_bill);

module.exports = router;
