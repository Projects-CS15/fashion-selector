const supabase = require('../supabase');

// Signup
exports.signup = async (req, res) => {
  console.log('Signup request received'); // Add logging
  const { email, password } = req.body;

  try {
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log('Signup error:', error.message); // Add logging
      return res.status(400).json({ message: error.message });
    }

    console.log('Signup successful:', user); // Add logging
    res.json({ user, session });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).send('Server error');
  }
};

// Login
exports.login = async (req, res) => {
  console.log('Login request received'); // Add logging
  const { email, password } = req.body;

  try {
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      console.log('Login error:', error.message); // Add logging
      return res.status(400).json({ message: error.message });
    }

    console.log('Login successful:', user); // Add logging
    res.json({ user, session });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).send('Server error');
  }
};
