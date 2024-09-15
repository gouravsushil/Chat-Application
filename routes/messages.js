const router = require('express').Router();
// const User = require('../model/messageModel');
const { addMessage, getMessage } = require('../controllers/messagesController');

router.post('/addmsg', addMessage);
router.post('/getmsg', getMessage);

module.exports = router; 