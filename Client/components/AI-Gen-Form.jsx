import React, { useState } from 'react';
import axios from 'axios';
import SpeechRecognition from './SpeechRecognition';

function AIGenForm({ onImageGenerated, setLoading, setCurrentImageUrl }) {
  const [item, setItem] = useState('');
  const [color, setColor] = useState('');
  const [style, setStyle] = useState('');
  const [features, setFeatures] = useState('');
  const [additional, setAdditional] = useState('');
<<<<<<< HEAD:Client/components/ImageGenerationForm.jsx

=======
>>>>>>> 831c2c454180d437cc22542810c866e001a563ca:Client/components/AI-Gen-Form.jsx

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentImageUrl(null);
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
<<<<<<< HEAD:Client/components/ImageGenerationForm.jsx
    <form onSubmit={handleSubmit}>

=======
    <form onSubmit={handleSubmit} className="form-container">
>>>>>>> 831c2c454180d437cc22542810c866e001a563ca:Client/components/AI-Gen-Form.jsx
      <label>
        Item
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
<<<<<<< HEAD:Client/components/ImageGenerationForm.jsx
      <SpeechRecognition
        key='item'
        formId='item'
        setter={setItem}
      ></SpeechRecognition>
      </label>
      <br />
=======
        <SpeechRecognition key="item" formId="item" setter={setItem} />
      </label>
>>>>>>> 831c2c454180d437cc22542810c866e001a563ca:Client/components/AI-Gen-Form.jsx

      <label>
        Color
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
<<<<<<< HEAD:Client/components/ImageGenerationForm.jsx
        <SpeechRecognition
        key='color'
        formId='color'
        setter={setColor}
      ></SpeechRecognition>
      </label>
      <br />
=======
        <SpeechRecognition key="color" formId="color" setter={setColor} />
      </label>
>>>>>>> 831c2c454180d437cc22542810c866e001a563ca:Client/components/AI-Gen-Form.jsx

      <label>
        Style
        <input
          type="text"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
<<<<<<< HEAD:Client/components/ImageGenerationForm.jsx
        <SpeechRecognition
        key='style'
        formId='style'
        setter={setStyle}
      ></SpeechRecognition>
      </label>
      <br />
=======
        <SpeechRecognition key="style" formId="style" setter={setStyle} />
      </label>
>>>>>>> 831c2c454180d437cc22542810c866e001a563ca:Client/components/AI-Gen-Form.jsx

      <label>
        Features
        <input
          type="text"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />
<<<<<<< HEAD:Client/components/ImageGenerationForm.jsx
        <SpeechRecognition
        key='features'
        formId='features'
        setter={setFeatures}
      ></SpeechRecognition>
      </label>
      <br />
=======
        <SpeechRecognition key="features" formId="features" setter={setFeatures} />
      </label>
>>>>>>> 831c2c454180d437cc22542810c866e001a563ca:Client/components/AI-Gen-Form.jsx

      <label>
        Additional info
        <input
          type="text"
          value={additional}
          onChange={(e) => setAdditional(e.target.value)}
        />
<<<<<<< HEAD:Client/components/ImageGenerationForm.jsx
        <SpeechRecognition
        key='additional'
        formId='additional'
        setter={setAdditional}
      ></SpeechRecognition>
      </label>
      <br />
=======
        <SpeechRecognition key="additional" formId="additional" setter={setAdditional} />
      </label>
>>>>>>> 831c2c454180d437cc22542810c866e001a563ca:Client/components/AI-Gen-Form.jsx

      <button type="submit">Generate Image</button>
    </form>
  );
}

export default AIGenForm;
