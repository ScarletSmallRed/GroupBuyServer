const express = require('express');
const router = express.Router();
const RecordingController = require('../controllers/recordings');

router.post('/create', RecordingController.recordings_creating_recording);
router.get('/', RecordingController.recordings_get_all);
router.post('/search', RecordingController.recordings_search_recording);

module.exports = router;
