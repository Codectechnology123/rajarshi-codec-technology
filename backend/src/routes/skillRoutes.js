const router = require('express').Router();
const controller = require('../controllers/skillController');
router.get('/', controller.getSkills);
module.exports = router;
