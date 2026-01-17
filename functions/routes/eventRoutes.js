const express = require('express');
const { getEvents, addEvent } = require('../controllers/eventController');
const router = express.Router();

router.get('/', getEvents);
router.post('/', addEvent);

module.exports = router;

