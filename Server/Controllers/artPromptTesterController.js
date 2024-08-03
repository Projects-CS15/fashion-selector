const dotenv = require('dotenv');
const axios = require('axios');
const FormData = require('form-data');

dotenv.config();

const endpoint_openai = process.env.OPENAI_ENDPOINT;
const openai_key = process.env.OPENAI_API_KEY;

const endpoint_bing = 'https://api.bing.microsoft.com/v7.0/images/visualsearch';
const subscriptionKey_bing = process.env.SUBSCRIPTION_KEY;
const artPromptTesterController = {};

const generatePrompt = (details) => {
  return `Create a high-quality piece of art that matches the following criteria:
    Interests: ${details.interests},
    Color Palette: ${details.colorPalette},
    Location: ${details.location},
    Medium: ${details.medium},
    Preferred Topics: ${details.preferredTopics},
    Excluded Topics: ${details.excludedTopics}.`;
};

artPromptTesterController.generateArtImage = async (req, res, next) => {
  const { promptDetails } = req.body;

  if (!promptDetails) {
    return res.status(400).json({ error: 'Prompt details are missing.' });
  }

  try {
    const prompt = generatePrompt(promptDetails);

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
    console.error("Error in Image Generation: ", error);
    res.status(500).json({ error: "An error occurred during image generation." });
  }
};

artPromptTesterController.matchArtService = async (req, res, next) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    const knowledgeRequest = JSON.stringify({
      imageInfo: { url: imageUrl },
    });

    const formData = new FormData();
    formData.append('knowledgeRequest', knowledgeRequest);

    const bingResponse = await axios.post(`${endpoint_bing}?mkt=en-us`, formData, {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey_bing,
        ...formData.getHeaders(),
      },
    });

    const data = bingResponse.data;

    const simplifiedData = data.tags[0].actions
      .filter((action) => action.actionType === 'VisualSearch')
      .flatMap((action) => action.data.value)
      .map((item) => ({
        contentUrl: item.contentUrl,
        hostPageUrl: item.hostPageUrl,
        name: item.name,
      }))
      .filter(
        (item) =>
          item.contentUrl.toLowerCase().includes('shop') ||
          item.hostPageUrl.toLowerCase().includes('shop')
      );

    const limitedResults = simplifiedData.slice(0, 15);

    res.json(limitedResults);
  } catch (error) {
    console.error('Visual Search Error:', error);
    res.status(500).json({ error: 'An error occurred during visual search.' });
  }
};

module.exports = artPromptTesterController;
