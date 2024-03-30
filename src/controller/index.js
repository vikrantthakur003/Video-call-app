const { authenticateUser, generateJWT } = require('../middleware');

const router = require('express').Router();

router.route('/').post(authenticateUser, generateJWT, async (req, res) => {
  console.log('hi i reached here yeeeeeeeeeeeee')
  res.redirect(301,'http://localhost:4000/public/lobby.html')
});

module.exports = router;
