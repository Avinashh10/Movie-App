const jwt = require('jsonwebtoken');
const User = require('../models/user');


exports.authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('name email role');
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Optional auth: attach user if token is valid, otherwise continue without user.
exports.optionalAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('name email role');
  } catch (err) {
    // Ignore invalid token for public reads
  }

  next();
};
