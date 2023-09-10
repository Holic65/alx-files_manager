const express = require('express')
const router = express.Router()
import AppController from '../controllers/AppController';
import usersController from '../controllers/UsersController';


router.get('/status', (req, res) => AppController.getStatus(req, res));
router.get('/stats', (req, res) => AppController.getStats(req, res));

router.post('/users', (req, res) => usersController.postNew(req, res))
module.exports = router
