const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models")
const app = express();
const SECRET_KEY = String(process.env.JWT_SECRET)


// Define the authentication function as middleware
exports.authenticateUser = async (req, res, next) => {
  const { username, password } = req.body;
  console.log( username, '*****', password)
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    console.log(existingUser)
    if (existingUser) {
      // User exists, proceed with login
      if (bcrypt.compareSync(password, existingUser.password)) {
        req.user = { username: existingUser.username, id: existingUser._id };
        next(); // Proceed to the next middleware or route handler
      } else {
        return res.status(401).send('Invalid password');
      }
    } else {
      // User does not exist, proceed with registration
      const hashedPassword = await bcrypt.hash(password, 10);
      // console.log('*******',hashedPassword)
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      // console.log(newUser, '////////////')
      req.user = { username: newUser.username, id: newUser._id };
      console.log(req.user)
      next(); // Proceed to the next middleware or route handler
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    return res.status(500).send('Internal Server Error');
  }
}

// Middleware to generate JWT
exports.generateJWT = async (req, res, next) => {
  try {
    const accessToken = jwt.sign(req.user, SECRET_KEY);
    console.log(accessToken)
    req.accessToken = accessToken; // Attach the access token to the request object
    next(); // Proceed to the next middleware or route handler
    
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}