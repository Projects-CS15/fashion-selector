// Search.jsx

import React, { useState } from 'react';
import { createTheme } from '@mui/material/styles'; // import create from @mui/material/styles to create a new theme 
import { Typography, Button, Box } from '@mui/material'; // import Typography, Button, and Box from @mui/material to use in the Search component so that the user can see the generated image and click Yes or No 
import { useNavigate } from 'react-router-dom'; // useNavigate is a hook that returns a navigate function to navigate to a different route
import InputForm from './InputForm';
import ShowImages from './ShowImages';
import { create } from '@mui/material/styles/createTransitions';
import { from } from 'form-data';

function Search({ setTheme }) {
  const [currentImageUrl, setCurrentImageUrl] = useState(null); // currentImageUrl state to store the current image url
  const [currentPrompt, setCurrentPrompt] = useState(''); // currentPrompt state to store the current prompt
  const [bingData, setBingData] = useState(''); // bingData state to store the bing data
  const navigate = useNavigate(); // navigate function to navigate to a different route

  const handleImageGenerated = async (imageUrl, prompt) => { // async so that we can use await inside the function
    setCurrentImageUrl(imageUrl);
    setCurrentPrompt(prompt);
  };

  const handleNoClick = async () => {
    try {
      const response = await fetch('/api/genImage', {
        // fetch request to the /api/genImage endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: currentPrompt.item, color: currentPrompt.color, style: currentPrompt.style }),
      });

      if (!response.ok) throw new Error('Network response was not ok on No button of Search.jsx');

      const data = await response.json();
      handleImageGenerated(data.image_url, currentPrompt); // handleImageGenerated is a function that sets the currentImageUrl state

      if(setTheme) {
        const newTheme = createTheme({
          palette : {
            mode: prompt.style.toLowerCase().includes('dark') ? 'dark' : 'light',
            primary: { main: getColorFromPrompt(prompt.color) },
          },
        });
        setTheme(newTheme);
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleYesClick = async () => {
    try {
      const response = await fetch('/api/bing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: currentImageUrl }),
      });

      if (!response.ok) throw new Error('Network response was not ok on Yes button of Search.jsxf');

      const data = await response.json();
      setBingData(data);
      console.log(data);

      // navigate('/images', { state: { images: data } });
    } catch (error) {
      console.error('Error in handleYesClick:', error);
    }
  };

  return (
    <div className="search-page pages">
      <div>
        <h1>Discover Your Style!</h1>
        {/* // InputForm component with onImageGenerated prop */}
        <InputForm onImageGenerated={handleImageGenerated} />
        <br />
        {currentImageUrl && (
          <div>
            <img
              src={currentImageUrl}
              alt="Generated"
              className="generatedImg"
            />
            <button onClick={handleNoClick}>No</button>
            <button onClick={handleYesClick}>Yes</button>
          </div>
        )}
      </div>
      {bingData ? (
        <ShowImages bingData={bingData} />
      ) : (
        <div style={{ width: '400px' }}></div>
      )}
      {/* {bingData && <ShowImages bingData={bingData} />} */}
    </div>
    return (
      <box className="search-page pages" sx={{ p: 3 }}>
        Typography variant="h4" gutterBottom>Discover Your Style!</Typography>
        <InputForm onImageGenerated={handleImageGenerated} />
           
  );
}

export default Search;
