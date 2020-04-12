const express = require('express');
const router = express.Router();

const dinosaure = require('./controllers/dinosaureController');

router.get('/dino', dinosaure.index);
router.post('/signup', dinosaure.register);
router.get('/dino/:id', dinosaure.show);
router.put('/dino/:id', dinosaure.update);
router.delete('/dino/:id', dinosaure.delete);
router.put('/dino/addfriend/:id', dinosaure.addFriend);
router.put('/dino/removefriend/:id', dinosaure.removeFriend);

module.exports = router;