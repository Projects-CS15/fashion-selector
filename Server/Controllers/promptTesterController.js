const dotenv = require('dotenv');
const axios = require('axios');
const FormData = require('form-data');

dotenv.config();

const endpoint_openai = process.env.OPENAI_ENDPOINT;
const openai_key = process.env.OPENAI_API_KEY;
const endpoint_bing = process.env.BING_ENDPOINT;
const subscriptionKey_bing = process.env.SUBSCRIPTION_KEY;

const promptTesterController = {};

const generatePrompt = (promptType, parameters) => {
  let prompt = '';

  switch (promptType) {
    case 'detailed':
      prompt = `Create a high-quality image of a ${parameters.color} ${parameters.item} in ${parameters.style} style. The ${parameters.item} should feature ${parameters.details}. `;
      if (parameters.additionalItems) {
        prompt += `The ${parameters.item} should be styled with ${parameters.additionalItems}. `;
      }
      prompt += "The image should have a plain white background, with the item centered and facing the front. Ensure the item is fully within the image borders, and the image should be clear and well-lit.";
      break;

    case 'mood':
      prompt = `Imagine a ${parameters.mood} outfit perfect for ${parameters.occasion}. Design a ${parameters.color} ${parameters.item} as the centerpiece of this outfit, incorporating ${parameters.details}. `;
      if (parameters.additionalItems) {
        prompt += `Include ${parameters.additionalItems} to complete the look. `;
      }
      prompt += `Showcase the outfit in a ${parameters.setting} with ${parameters.lighting} to emphasize the overall aesthetic.`;
      break;

    case 'wearer':
      prompt = `Create a high-quality image of a ${parameters.bodyType} model wearing a ${parameters.color} ${parameters.item} in ${parameters.style} style. The ${parameters.item} should feature ${parameters.details}. `;
      if (parameters.additionalItems) {
        prompt += `Style the model with ${parameters.additionalItems} to create a complete look. `;
      }
      prompt += `The image should have a ${parameters.background}.`;
      break;

    case 'trend':
      prompt = `Design a ${parameters.color} ${parameters.item} inspired by the ${parameters.trend}. The ${parameters.item} should incorporate ${parameters.details} that reflect the key elements of this trend. `;
      if (parameters.additionalItems) {
        prompt += `Consider pairing the ${parameters.item} with ${parameters.additionalItems} to enhance the look. `;
      }
      prompt += `Showcase the outfit in a way that highlights its unique features and appeals to ${parameters.targetAudience}.`;
      break;

    default:
      throw new Error('Invalid prompt type');
  }

  return prompt;
};

promptTesterController.generateImageTest = async (req, res, next) => {
  const { promptType, parameters } = req.body;

  if (!promptType || !parameters) {
    return res.status(400).json({ error: 'Prompt type or parameters are missing.' });
  }

  try {
    const prompt = generatePrompt(promptType, parameters);

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

promptTesterController.matchService = async (req, res, next) => {
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

module.exports = promptTesterController;
