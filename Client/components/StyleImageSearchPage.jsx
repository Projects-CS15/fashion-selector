import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AIGenForm from './AI-Gen-Form';
import AIGenResult from './AI-Gen-Result';;
import MatchedResults from './Matched-Results';
import SurpriseMe from './SurpriseMe';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { fakeBing, fakeImg } from './__fakeData';

function StyleImageSearchPage() {
  const [currentPrompt, setCurrentPrompt] = useState('');

  // const [currentImageUrl, setCurrentImageUrl] = useState(null);  // --- dummy DALL-E img below - comment out the below and un-comment this to switch to real data
  const [currentImageUrl, setCurrentImageUrl] = useState(fakeImg);

  // const [bingData, setBingData] = useState(''); // --- dummy bing data below - comment out the below and un-comment this to switch to real data
  const [bingData, setBingData] = useState(fakeBing);

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [loadingBing, setLoadingBing] = useState(false);

  const handleImageGenerated = (imageUrl, prompt) => {
    setCurrentImageUrl(imageUrl);
    setCurrentPrompt(prompt);
    setLoading(false);
  };

  const handleTryAgainClick = async () => {
    setCurrentImageUrl(null);
    setLoading(true);
    setBingData('');
    try {
      const response = await axios.post('/api/generate-image', {
        item: currentPrompt.item,
        color: currentPrompt.color,
        style: currentPrompt.style,
        features: currentPrompt.features,
      });
      handleImageGenerated(response.data.image_url, currentPrompt);
    } catch (error) {
      console.error('Error generating new image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFindMatchingItemsClick = async () => {
    setBingData('');
    setLoadingBing(true);
    try {
      const response = await axios.post('/api/match-service', {
        imageUrl: currentImageUrl,
      });
      setBingData(response.data);
    } catch (error) {
      console.error('Error searching Bing:', error);
    } finally {
      setLoadingBing(false);
    }
  };

  const handleSurprise = async (randomPrompt) => {
    setCurrentPrompt(randomPrompt);
    setCurrentImageUrl(null);
    setLoading(true);
    try {
      const response = await axios.post('/api/generate-image', randomPrompt);
      handleImageGenerated(response.data.image_url, randomPrompt);
    } catch (error) {
      console.error('Error generating new image:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="spacer"></div>
      <div className="containerOuter">
        <div className="container">
          <div className="form-container">
            <p className="discover">Discover your style</ p>
            <h3 className="fashion">Fashion, Art, Furniture</h3>
            <hr></hr>
            <AIGenForm
              onImageGenerated={handleImageGenerated}
              setLoading={setLoading}
              setCurrentImageUrl={setCurrentImageUrl}
              setBingData={setBingData}
            />
            <br />
          </div>
          <div className="rightContainer">
            {loading && (
              <div className="dallEProgress" style={{ textAlign: 'center' }}>
                <CircularProgress />
                <p>Finding your style...</p>
              </div>
            )}
            {currentImageUrl && (
              <AIGenResult
                imageUrl={currentImageUrl}
                onTryAgainClick={handleTryAgainClick}
                onFindMatchingItemsClick={handleFindMatchingItemsClick}
              />
            )}
            {bingData ? (
              <MatchedResults bingData={bingData} />
            ) : (
              <div ></div>
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

export default StyleImageSearchPage;
