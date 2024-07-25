import React, { useState } from 'react';
import axios from 'axios';

function ImageGenerationForm({ onImageGenerated, setCurrentImageUrl }) {
  const [item, setItem] = useState('');
  const [color, setColor] = useState('');
  const [style, setStyle] = useState('');
  const [features, setFeatures] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentImageUrl(null);

    try {
      const response = await axios.post('/api/generate-image', { item, color, style, features });
      onImageGenerated(response.data.image_url, { item, color, style, features });
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Item:
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
      </label>
      <br />
      <label>
        Color:
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>
      <br />
      <label>
        Style:
        <input
          type="text"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Features:
        <input
          type="text"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Generate Image</button>
    </form>
  );
}

export default ImageGenerationForm;
