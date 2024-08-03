import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AIGenResult from './AI-Gen-Result';
import MatchedResults from './Matched-Results';
import SurpriseMe from './SurpriseMe';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import '../index.css'

function DiscoverPrompt({ userId }) {
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentPrompt, setCurrentPrompt] = useState({});
  const [promptType, setPromptType] = useState('detailed');
  const [bingData, setBingData] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingBing, setLoadingBing] = useState(false);
  const [activeButtons, setActiveButtons] = useState({});

  const colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow'];
  const items = ['Shirt', 'Pants', 'Dress', 'Skirt', 'Jacket'];
  const styles = ['Casual', 'Formal', 'Sporty'];
  const details = ['Patterns', 'Plain', 'Stripes'];
  const moods = ['Happy', 'Sad', 'Relaxed', 'Energetic'];
  const occasions = ['Wedding', 'Party', 'Casual Outing', 'Office'];
  const settings = ['Beach', 'Park', 'City', 'Countryside'];
  const lightings = ['Bright', 'Dim', 'Natural', 'Artificial'];
  const bodyTypes = ['Slim', 'Athletic', 'Curvy'];
  const backgrounds = ['Plain', 'Nature', 'Urban'];
  const trends = ['Vintage', 'Modern', 'Streetwear'];
  const targetAudiences = ['Teens', 'Adults', 'Seniors'];

  const generatePrompt = (promptType, parameters) => {
    let prompt = '';

    switch (promptType) {
      case 'detailed':
        prompt = `Create a high-quality image of a <b>${parameters.color} ${parameters.item}</b> in <b>${parameters.style}</b> style. The <b>${parameters.item}</b> should feature <b>${parameters.details}</b>. `;
        if (parameters.additionalItems) {
          prompt += `The ${parameters.item} should be styled with ${parameters.additionalItems}. `;
        }
        prompt += "The image should have a plain white background, with the item centered and facing the front. Ensure the item is fully within the image borders, and the image should be clear and well-lit.";
        break;

      case 'mood':
        prompt = `Imagine a <b>${parameters.mood}</b> outfit perfect for <b>${parameters.occasion}</b>. Design a <b>${parameters.color} ${parameters.item}</b> as the centerpiece of this outfit, incorporating <b>${parameters.details}</b>. `;
        if (parameters.additionalItems) {
          prompt += `Include ${parameters.additionalItems} to complete the look. `;
        }
        prompt += `Showcase the outfit in a <b>${parameters.setting}</b> with <b>${parameters.lighting}</b> to emphasize the overall aesthetic.`;
        break;

      case 'wearer':
        prompt = `Create a high-quality image of a <b>${parameters.bodyType}</b> model wearing a <b>${parameters.color} ${parameters.item}</b> in <b>${parameters.style}</b> style. The <b>${parameters.item}</b> should feature <b>${parameters.details}</b>. `;
        if (parameters.additionalItems) {
          prompt += `Style the model with ${parameters.additionalItems} to create a complete look. `;
        }
        prompt += `The image should have a <b>${parameters.background}</b>.`;
        break;

      case 'trend':
        prompt = `Design a <b>${parameters.color} ${parameters.item}</b> inspired by the <b>${parameters.trend}</b>. The <b>${parameters.item}</b> should incorporate <b>${parameters.details}</b> that reflect the key elements of this trend. `;
        if (parameters.additionalItems) {
          prompt += `Consider pairing the <b>${parameters.item}</b> with ${parameters.additionalItems} to enhance the look. `;
        }
        prompt += `Showcase the outfit in a way that highlights its unique features and appeals to <b>${parameters.targetAudience}</b>.`;
        break;

      default:
        break;
    }

    return prompt;
  };

  const handleImageGenerated = (imageUrl, prompt) => {
    setCurrentImageUrl(imageUrl);
    setCurrentPrompt(prompt);
    setLoading(false);
  };

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const promptText = generatePrompt(promptType, currentPrompt);
      const response = await axios.post('/api/generate-image/test', { promptType, parameters: currentPrompt });
      handleImageGenerated(response.data.image_url, currentPrompt);
    } catch (error) {
      console.error('Error generating image:', error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  const handleTryAgainClick = async () => {
    setCurrentImageUrl(null);
    setLoading(true);
    try {
      const response = await axios.post('/api/generate-image/test', { promptType, parameters: currentPrompt });
      handleImageGenerated(response.data.image_url, currentPrompt);
    } catch (error) {
      console.error('Error generating new image:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFindMatchingItemsClick = async () => {
    setBingData('');
    setLoadingBing(true);
    try {
      const response = await axios.post('/api/match-service/test', { imageUrl: currentImageUrl });
      setBingData(response.data);
    } catch (error) {
      console.error('Error searching Bing:', error.response ? error.response.data : error.message);
    } finally {
      setLoadingBing(false);
    }
  };

  const handleSurprise = async (randomPrompt) => {
    setCurrentPrompt(randomPrompt);
    setCurrentImageUrl(null);
    setLoading(true);
    try {
      const promptText = generatePrompt(promptType, randomPrompt);
      const response = await axios.post('/api/generate-image/test', { promptType, parameters: randomPrompt });
      handleImageGenerated(response.data.image_url, randomPrompt);
    } catch (error) {
      console.error('Error generating new image:', error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  const handleAddToFavorites = async (imageUrl) => {
    try {
      const response = await axios.post('/api/favorites', { userId, prompt: currentPrompt, imageUrl });
      console.log('Added to favorites:', response.data);
    } catch (error) {
      console.error('Error adding to favorites:', error.response ? error.response.data : error.message);
    }
  };

  const handlePromptChange = (e) => {
    const { name, value } = e.target;
    setCurrentPrompt((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleButtonClick = (buttonName) => {
    setActiveButtons((prev) => ({
      ...prev,
      [buttonName]: !prev[buttonName],
    }));
  };

  const renderPromptFields = () => {
    switch (promptType) {
      case 'detailed':
        return (
          <>
            <label>Color:
              <select name="color" onChange={handlePromptChange}>
                {colors.map(color => <option key={color} value={color}>{color}</option>)}
              </select>
            </label>
            <label>Item:
              <select name="item" onChange={handlePromptChange}>
                {items.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label>Style:
              <select name="style" onChange={handlePromptChange}>
                {styles.map(style => <option key={style} value={style}>{style}</option>)}
              </select>
            </label>
            <label>Details:
              <select name="details" onChange={handlePromptChange}>
                {details.map(detail => <option key={detail} value={detail}>{detail}</option>)}
              </select>
            </label>
            <label>Additional Items:
              <input name="additionalItems" onChange={handlePromptChange} />
            </label>
          </>
        );
      case 'mood':
        return (
          <>
            <label>Mood:
              <select name="mood" onChange={handlePromptChange}>
                {moods.map(mood => <option key={mood} value={mood}>{mood}</option>)}
              </select>
            </label>
            <label>Occasion:
              <select name="occasion" onChange={handlePromptChange}>
                {occasions.map(occasion => <option key={occasion} value={occasion}>{occasion}</option>)}
              </select>
            </label>
            <label>Color:
              <select name="color" onChange={handlePromptChange}>
                {colors.map(color => <option key={color} value={color}>{color}</option>)}
              </select>
            </label>
            <label>Item:
              <select name="item" onChange={handlePromptChange}>
                {items.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label>Details:
              <select name="details" onChange={handlePromptChange}>
                {details.map(detail => <option key={detail} value={detail}>{detail}</option>)}
              </select>
            </label>
            <label>Additional Items: <input name="additionalItems" onChange={handlePromptChange} /></label>
            <label>Setting:
              <select name="setting" onChange={handlePromptChange}>
                {settings.map(setting => <option key={setting} value={setting}>{setting}</option>)}
              </select>
            </label>
            <label>Lighting:
              <select name="lighting" onChange={handlePromptChange}>
                {lightings.map(lighting => <option key={lighting} value={lighting}>{lighting}</option>)}
              </select>
            </label>
          </>
        );
      case 'wearer':
        return (
          <>
            <label>Body Type:
              <select name="bodyType" onChange={handlePromptChange}>
                {bodyTypes.map(bodyType => <option key={bodyType} value={bodyType}>{bodyType}</option>)}
              </select>
            </label>
            <label>Color:
              <select name="color" onChange={handlePromptChange}>
                {colors.map(color => <option key={color} value={color}>{color}</option>)}
              </select>
            </label>
            <label>Item:
              <select name="item" onChange={handlePromptChange}>
                {items.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label>Style:
              <select name="style" onChange={handlePromptChange}>
                {styles.map(style => <option key={style} value={style}>{style}</option>)}
              </select>
            </label>
            <label>Details:
              <select name="details" onChange={handlePromptChange}>
                {details.map(detail => <option key={detail} value={detail}>{detail}</option>)}
              </select>
            </label>
            <label>Additional Items: <input name="additionalItems" onChange={handlePromptChange} /></label>
            <label>Background:
              <select name="background" onChange={handlePromptChange}>
                {backgrounds.map(background => <option key={background} value={background}>{background}</option>)}
              </select>
            </label>
          </>
        );
      case 'trend':
        return (
          <>
            <label>Color:
              <select name="color" onChange={handlePromptChange}>
                {colors.map(color => <option key={color} value={color}>{color}</option>)}
              </select>
            </label>
            <label>Item:
              <select name="item" onChange={handlePromptChange}>
                {items.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label>Trend:
              <select name="trend" onChange={handlePromptChange}>
                {trends.map(trend => <option key={trend} value={trend}>{trend}</option>)}
              </select>
            </label>
            <label>Details:
              <select name="details" onChange={handlePromptChange}>
                {details.map(detail => <option key={detail} value={detail}>{detail}</option>)}
              </select>
            </label>
            <label>Additional Items: <input name="additionalItems" onChange={handlePromptChange} /></label>
            <label>Target Audience:
              <select name="targetAudience" onChange={handlePromptChange}>
                {targetAudiences.map(audience => <option key={audience} value={audience}>{audience}</option>)}
              </select>
            </label>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="spacer"></div>
      <div className="containerOuter">
        <div className="container">
          <div className="form-container">
            <p className="discover">Discover your style</p>
            <h3 className="fashion">Art</h3>
            <hr />
            <div className="discoverContainer">
              <label htmlFor="promptType">Select Prompt Type: </label>
              <select
                id="promptType"
                value={promptType}
                onChange={(e) => {
                  setPromptType(e.target.value);
                  handleButtonClick(e.target.value);
                }}
              >
                <option value="detailed">Detailed</option>
                <option value="mood">Mood</option>
                <option value="wearer">Wearer</option>
                <option value="trend">Trend</option>
              </select>
            </div>
            <div className="discoverClass">
              <form>
                {renderPromptFields()}
                <button
                  type="button"
                  onClick={() => {
                    handleGenerateImage();
                    handleButtonClick('generate');
                  }}
                  className={activeButtons['generate'] ? 'active' : ''}
                >
                  Generate Image
                </button>
              </form>
              <hr />
            </div>
            <SurpriseMe
              onSurprise={handleSurprise}
              handleButtonClick={handleButtonClick}
              activeButtons={activeButtons}
            />
            <br />
          </div>
          <div className="rightContainer">
            {loading && (
              <div className="dallEProgress" style={{ textAlign: 'center' }}>
                <CircularProgress />
                <p>Finding Your Style...</p>
              </div>
            )}
            {currentImageUrl && (
              <>
                <AIGenResult
                  imageUrl={currentImageUrl}
                  onTryAgainClick={() => {
                    handleTryAgainClick();
                    handleButtonClick('tryAgain');
                  }}
                  onFindMatchingItemsClick={() => {
                    handleFindMatchingItemsClick();
                    handleButtonClick('findMatching');
                  }}
                  onAddToFavoritesClick={handleAddToFavorites} 
                />
              </>
            )}
            {bingData ? (
              <MatchedResults 
                bingData={bingData} 
                currentImageUrl={currentImageUrl} 
                currentPrompt={currentPrompt} 
                userId={userId} 
              />
            ) : (
              <div style={{ width: '500px' }}></div>
            )}
            {loadingBing && (
              <div style={{ textAlign: 'center' }}>
                <LinearProgress />
                <p>Finding Matching Items...</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="spacerBottom"></div>
    </>
  );
}

export default DiscoverPrompt;
