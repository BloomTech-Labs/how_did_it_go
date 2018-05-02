const jwt = require('jsonwebtoken');
const { secret } = require('./config');

const getToken = userObj => {
  return jwt.sign(userObj, secret, { algorithm: 'RS256'}, { expiresIn: 10 * 60 * 60 });
};

const validateToken = (req, res, next) => {
  // take the token up to the server and verify it
  // if no token found in the header, get 422
  // if token not valid, user will be asked to login
  const token = req.headers.authorization;
  if (!token) {
    res.status(422).json({ error: 'No token found on header' });
    return;
  }

  jwt.verity(token, secret, (authErr, decoded) => {
    if (authErr) {
      res.status(403).json({message: authErr, error: 'Token invalid, please login'});
      return;
    }

    // decode jwt and set on the req.decoded, pass to next middleware
    req.decoded = decoded;
    next();
  });
};

module.exports = {
  getToken,
  validateToken
};