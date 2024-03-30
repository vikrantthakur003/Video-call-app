const User = require('../models/index');

exports.createUser = (user) => {
  new Promise ((resolve, reject) => {
    const newUser = new User(user);
    newUser.save()
    .then(resolve)
    .catch(reject)
  });
}

exports.checkUser = (user = {}) => {
  new Promise ((resolve, reject) => {
    User.findOne(user)
    .then(resolve)
    .catch(reject)
  });
}