const router = require('express').Router();
const controller = require('../controllers/profileController');
router.get('/', controller.getProfile);
module.exports = router;
