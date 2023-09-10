const express = require('express')
const router = express.Router()
import AppController from '../controllers/AppController';

router.get('/status', (req, res) => res.send(AppController.getStatus));

router.get('/stats', (req, res) => res.send(AppController.getStats));

module.exports = router
