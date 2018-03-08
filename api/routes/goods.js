const express = require('express')
const router = express.Router()
const GoodController = require('../controllers/goods')
const checkAuth = require('../middleware/check-auth');
const uploadImage = require('../middleware/multerUse');

router.get('/', GoodController.goods_get_all);
router.post('/addCart', GoodController.goods_add_cart)
router.get('/list', GoodController.goods_get_conditional_list)
router.get('/search/:keyWord', checkAuth, GoodController.goods_search_good);
router.get('/:goodId', checkAuth, GoodController.goods_get_good);
router.post('/create', checkAuth,uploadImage.dataInput, GoodController.goods_create_good);
router.post('/:goodId', checkAuth,uploadImage.dataInput, GoodController.goods_updateimg_good);
router.patch('/:goodId', checkAuth,uploadImage.dataInput, GoodController.goods_update_good);
router.delete('/:goodId', checkAuth, GoodController.goods_delete_good);

module.exports = router