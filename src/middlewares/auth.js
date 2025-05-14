const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.cookies.jwt;
    const token = authHeader ? authHeader : null;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
        if (err) {
          if (err.name === 'TokenExpiredError') return res.status(403).json({ error: 'Token expirado' });

          console.error(err);
          return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
}

exports.generateTokens = (user) => {
    const accessToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  const refreshToken = jwt.sign({ email: user.email }, process.env.REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRATION,
  });

  return { accessToken, refreshToken };
}

exports.verifyAdmin = (req, res, next) => {
    const authHeader = req.cookies.jwt;
    const token = authHeader ? authHeader : null;
    if (!token) return res.sendStatus(401);

    console.log('Token:', token);
    jwt.verify(token, process.env.REFRESH_SECRET, (err, user) => {
        if (err) {
          if (err.name === 'TokenExpiredError') return res.status(403).json({ error: 'Token expirado' });

          console.error(err);
          return res.sendStatus(403);
        }

        if (user.email !== 'admin') return res.status(403).json({ error: 'Access denied' });

        req.user = user;
        next();
    });
}