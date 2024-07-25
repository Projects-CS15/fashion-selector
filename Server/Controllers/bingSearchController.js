const dotenv = require('dotenv');
const axios = require('axios');
const FormData = require('form-data');

dotenv.config();

const endpoint = 'https://api.bing.microsoft.com/v7.0/images/visualsearch';
const subscriptionKey = process.env.SUBSCRIPTION_KEY;

const bingSearchController = {};

bingSearchController.matchService = async (req, res, next) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: 'Dall-e Image URL is required' });
    }

    const knowledgeRequest = JSON.stringify({
      imageInfo: { url: imageUrl },
    });

    const formData = new FormData();
    formData.append('knowledgeRequest', knowledgeRequest);

    const response = await axios.post(`${endpoint}?mkt=en-us`, formData, {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        ...formData.getHeaders(),
      },
    });

    const data = response.data;

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

    res.json(simplifiedData);
  } catch (error) {
    console.error('Visual Search Error:', error);
    res.status(500).json({ error: 'An error occurred on Visual Search.' });
  }
};

module.exports = bingSearchController;
