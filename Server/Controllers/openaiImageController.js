const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const endpoint_openai = 'https://api.openai.com/v1/images/generations';
const openai_key = process.env.OPENAI_API_KEY;

const openaiImageController = {};

openaiImageController.ImgGenService = async (req, res, next) => {
  const { item, color, style, features } = req.body;

  if (!item || !color || !style || !features) {
    return res
      .status(400)
      .json({ error: "Item, color, style or features is missing." });
  }

  try {
    const prompt = `Create an image of a ${style} ${item} in ${color} , 
    featuring ${features}. The image should have a white background 
    and the item should be facing the front. 
    The item should be 100% within the image border.`;

    const response = await axios.post(
      endpoint_openai,
      {
        prompt: prompt,
        n: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${openai_key}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const image_url = response.data.data[0].url;

    res.json({ image_url });
  } catch (error) {
    console.error("Dall E Image Generator Error: ", error);
    res
      .status(500)
      .json({ error: "An error occurred on Dall E Image Generator." });
  }
};

module.exports = openaiImageController;
