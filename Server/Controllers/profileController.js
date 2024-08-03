const { v4: uuidv4 } = require('uuid');
const supabase = require('../supabase');

const profileController = {};

/**
 * Middleware to decode binary avatar-img
 * data from the request object, assigns random file name, stores
 * in supabase bucket, stores URL reference to associated user
 * in profile record
 * @param {*} req http request as express object with multipart/form-data content-type header and raw binary payload
 * @param {*} res http response with URL for success or error
 */
profileController.uploadAvatar = async (req, res) => {
  const { userId } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileName = `${uuidv4()}-${file.originalname}`;
  console.log('File received:', file);

  try {
    const { error: uploadError, data: uploadData } = await supabase.storage
      .from('User-Avatars')
      .upload(fileName, file.buffer, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const avatarUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/User-Avatars/${fileName}`;

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: avatarUrl })
      .eq('id', userId);

    if (updateError) {
      throw updateError;
    }

    res.status(200).json({ avatarUrl });
  } catch (error) {
    console.error('Error uploading avatar:', error);
    res.status(500).json({ error: 'Failed to upload avatar' });
  }
};

profileController.getUserProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

profileController.updateProfile = async (req, res) => {
  const { userId, field, value } = req.body;

  if (!userId || !field || !value) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const updateData = {};
    updateData[field] = value;

    const { data, error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId);

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(`Error updating ${field}:`, error);
    res.status(500).json({ error: `Failed to update ${field}` });
  }
};

module.exports = profileController;
