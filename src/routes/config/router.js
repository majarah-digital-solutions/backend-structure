var express = require('express');
const { deployController } = require('../../controllers/config');
var router = express.Router();

/* GET users listing. */
router.post('/deploy', deployController);

/* GET users listing. */

module.exports = router;