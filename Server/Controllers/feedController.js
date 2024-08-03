const supabase = require('../supabase');

const feedController = {};

feedController.getAllMatches = async (req, res) => {
  try {
    const { data: matches, error } = await supabase
      .from('matches')
      .select(`
        match_id,
        photo_url,
        url,
        name,
        title,
        source
      `);

    if (error) {
      throw error;
    }

    res.status(200).json(matches);
  } catch (error) {
    console.error('Error in getAllMatches:', error);
    res.status(500).send('Server error');
  }
};

module.exports = feedController;
