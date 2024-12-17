const supabase = require('../supabase');

const authController = {};

authController.signup = async (req, res) => {
  console.log('Signup request received');
  const { email, password, firstName, lastName } = req.body;
  console.log('Signup details:', { email, password, firstName, lastName });

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName
        }
      }
    });

    if (error) {
      console.log('Signup error:', error.message);
      return res.status(400).json({ message: error.message });
    }

    const user = data.user;
    console.log(data);
    if (!user) {
      throw new Error('User object is undefined');
    }

    res.json({ user, session: data.session });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).send('Server error');
  }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
authController.login = async (req, res) => {
  console.log('Login request received');
  const { email, password } = req.body;
  console.log('Login details:', { email, password });

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log('Login error:', error.message);
      return res.status(400).json({ message: error.message });
    }

    const user = data.user;

    res.json({ user, session: data.session });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).send('Server error');
  }
};

module.exports = authController;
