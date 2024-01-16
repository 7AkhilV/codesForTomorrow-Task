const jwt = require('jsonwebtoken');

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {

    if (email !== 'admin@codesfortomorrow.com' || password !== 'Admin123!@#') {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const token = jwt.sign({ email: 'admin@codesfortomorrow.com' }, process.env.secret_key, {
      expiresIn: '1h',
    });

    return res.status(200).json({ message: 'Successfully logged in', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = adminLogin;
