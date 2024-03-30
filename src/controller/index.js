const { authenticateUser, generateJWT } = require('../middleware');

const router = require('express').Router();

router.route('/').post(authenticateUser, generateJWT, async (req, res) => {
  const accessToken = req.accessToken
  console.log('hi i reached here yeeeeeeeeeeeee', accessToken)
  res.setHeader('Authorization', `Bearer ${accessToken}`);
  
  // Send a success response with an empty body
  res.status(200).json({ accessToken });
});

module.exports = router;
