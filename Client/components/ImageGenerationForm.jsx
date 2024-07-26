import React, { useState } from 'react';
import axios from 'axios';
import SpeechRecognition from './SpeechRecognition';

function ImageGenerationForm({ onImageGenerated, setCurrentImageUrl }) {
  const [item, setItem] = useState('');
  const [color, setColor] = useState('');
  const [style, setStyle] = useState('');
  const [features, setFeatures] = useState('');
  const [additional, setAdditional] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentImageUrl(null);

    try {
      const response = await axios.post('/api/generate-image', { item, color, style, features, additional });
      onImageGenerated(response.data.image_url, { item, color, style, features, additional });
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <label>
        Item
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
      <SpeechRecognition
        key='item'
        formId='item'
        setter={setItem}
      ></SpeechRecognition>
      </label>
      <br />

      <label>
        Color
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <SpeechRecognition
        key='color'
        formId='color'
        setter={setColor}
      ></SpeechRecognition>
      </label>
      <br />

      <label>
        Style
        <input
          type="text"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
        <SpeechRecognition
        key='style'
        formId='style'
        setter={setStyle}
      ></SpeechRecognition>
      </label>
      <br />

      <label>
        Features
        <input
          type="text"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />
        <SpeechRecognition
        key='features'
        formId='features'
        setter={setFeatures}
      ></SpeechRecognition>
      </label>
      <br />

      <label>
        Additional info
        <input
          type="text"
          value={additional}
          onChange={(e) => setAdditional(e.target.value)}
        />
        <SpeechRecognition
        key='additional'
        formId='additional'
        setter={setAdditional}
      ></SpeechRecognition>
      </label>
      <br />

      <button type="submit">Generate Image</button>
    </form>
  );
}

export default ImageGenerationForm;
