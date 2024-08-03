import React, { useState } from 'react';
import axios from 'axios';
import ArtPromptForm from './ART-AI-Gen-Form';
import AIGenResult from './ART-AI-Gen-Result';
import MatchedArtResults from './ART-Matched-Results';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';


function ArtPromptTester({userId}) {
  const [loading, setLoading] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [promptDetails, setPromptDetails] = useState(null);
  const [bingData, setBingData] = useState([]);
  const [loadingBing, setLoadingBing] = useState(false);

  const handleImageGenerated = (imageUrl, details) => {
    setCurrentImageUrl(imageUrl);
    setPromptDetails(details);
    setLoading(false);
  };

  const handleTryAgainClick = async () => {
        setCurrentImageUrl(null);
    setLoading(true);
    try {
      const response = await axios.post('/api/generate-art-image', { promptDetails, userId });
      handleImageGenerated(response.data.image_url, promptDetails);
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
      const response = await axios.post('/api/match-art-service', { imageUrl: currentImageUrl, userId });
      setBingData(response.data);
    } catch (error) {
      console.error('Error searching Bing:', error.response ? error.response.data : error.message);
    } finally {
      setLoadingBing(false);
    }
  };

  return (
    <>
      <div className="spacer"></div>
      <div className="containerOuter">
        <div className="container">
          <div className="form-container">
            <p className="discover">Search your style</p>
            <h3 className="fashion">Fashion, Art, Furniture</h3>
            <hr />
            <ArtPromptForm
              onImageGenerated={handleImageGenerated}
              setLoading={setLoading}
              setCurrentImageUrl={setCurrentImageUrl}
              currentPrompt={promptDetails}
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
              <AIGenResult
                imageUrl={currentImageUrl}
                onTryAgainClick={handleTryAgainClick}
                onFindMatchingItemsClick={handleFindMatchingItemsClick}
              />
            )}
            {bingData ? (
              <MatchedArtResults
                bingData={bingData}
                currentImageUrl={currentImageUrl}
                currentPrompt={promptDetails}
                userId={userId}
              />
            ) : (
              <div></div>
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

export default ArtPromptTester;