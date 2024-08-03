import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AIGenForm from '../components/AI-Gen-Form';
import AIGenResult from '../components/AI-Gen-Result';
import MatchedResults from '../components/Matched-Results';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

function ImageSearch() {
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [bingData, setBingData] = useState('');
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

  return (
      <div
      className="search-page"
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        margin: '50px 80px',
      }}
    >
      <div style={{ minWidth: '350px' }}>
        <h1>Discover Your Style</h1>
        <AIGenForm
          onImageGenerated={handleImageGenerated}
          setLoading={setLoading}
          setCurrentImageUrl={setCurrentImageUrl}
        />
        <br />
        {loading && (
          <div style={{ textAlign: 'center' }}>
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
      </div>
      {bingData ? (
        <MatchedResults bingData={bingData} />
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
  );
}

export default ImageSearch;
