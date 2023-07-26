const petController = require('../controllers/petController');
const router = require("express").Router();

router.post('/', petController.addPet);

module.exports = router;
