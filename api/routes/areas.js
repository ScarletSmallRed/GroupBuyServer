const express = require('express')
const router = express.Router()
const AreaController = require('../controllers/areas')
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth,AreaController.areas_get_all);
router.get('/:areaId', checkAuth, AreaController.areas_get_area);
router.post('/create', checkAuth, AreaController.areas_create_area);
router.patch('/:areaId', checkAuth, AreaController.areas_update_area);
router.delete('/:areaId', checkAuth, AreaController.areas_delete_area);

module.exports = router