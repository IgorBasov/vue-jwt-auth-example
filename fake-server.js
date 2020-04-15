const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const fakeJWTSecretKey = 'top-secret-jwt-ky';
const fakeUser = { email: 'test@test.me', password: 'test', name: 'Ivan' };

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === fakeUser.email && password === fakeUser.password) {
    const { name } = fakeUser;
    const token = jwt.sign({ userInfo: { name, email } }, fakeJWTSecretKey);

    res.json({
      success: 1,
      data: { token, email, name }
    });
  } else {
    res
      .status(400)
      .json({ success: 0, data: { message: 'Wrong email and/or password' } });
  }
});

// Protected route
app.get('/whoami', authMiddleware, (req, res) => {
  res.json({
    success: 1,
    data: req.user
  });
});

// Auth middleware
function authMiddleware(req, res, next) {
  try {
    const token = req.headers['authorization'].split(' ')[1];

    jwt.verify(token, fakeJWTSecretKey, (error, user) => {
      if (error) throw error;

      req.user = user.userInfo;

      next();
    });
  } catch (error) {
    res
      .status(401)
      .json({ success: 0, data: { message: 'Authorization error' } });
  }
}

app.listen(3000, () => console.log('Server is listening on port 3000...'));
