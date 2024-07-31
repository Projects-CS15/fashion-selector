import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpeechRecognition from './SpeechRecognition';

function AIGenForm({ onImageGenerated, setLoading, setCurrentImageUrl, setBingData, currentPrompt }) {
  const [item, setItem] = useState('');
  const [color, setColor] = useState('');
  const [style, setStyle] = useState('');
  const [features, setFeatures] = useState('');
  const [additional, setAdditional] = useState('');

  useEffect(() => {
    if (currentPrompt) {
      setItem(currentPrompt.item);
      setColor(currentPrompt.color);
      setStyle(currentPrompt.style);
      setFeatures(currentPrompt.features);
      setAdditional(currentPrompt.additional);
    }
  }, [currentPrompt]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentImageUrl(null);
    setBingData('');
    setLoading(true);

    try {
      const response = await axios.post('/api/generate-image', { item, color, style, features, additional });
      onImageGenerated(response.data.image_url, { item, color, style, features, additional });
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="form-container2">

      <label>
        Item
        <br></br>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <SpeechRecognition key="item" formId="item" setter={setItem} />
      </label>
      <br></br>
      

      <label>
        Color
        <br></br>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <SpeechRecognition key="color" formId="color" setter={setColor} />
      </label>
      <br></br>
      

      <label>
        Style
        <br></br>
        <input
          type="text"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
        <SpeechRecognition key="style" formId="style" setter={setStyle} />
      </label>
      <br></br>
      

      <label>
        Features
        <br></br>
        <input
          type="text"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />
        <SpeechRecognition key="features" formId="features" setter={setFeatures} />
      </label>
      <br></br>
      

      <label>
        Additional info
        <br></br>
        <input
          type="text"
          value={additional}
          onChange={(e) => setAdditional(e.target.value)}
        />
        <SpeechRecognition key="additional" formId="additional" setter={setAdditional} />
      </label> 
      <br></br>
      

      <button className="generateImage" type="submit">Generate Image</button>
    </form>
  );
}

export default AIGenForm;
