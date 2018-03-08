const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const CategoryController = require('../controllers/categories')

router.get('/', CategoryController.categories_get_all)
router.post('/create', checkAuth,CategoryController.categories_create)
router.post('/delete', checkAuth,CategoryController.categories_delete_categorie);

module.exports = router