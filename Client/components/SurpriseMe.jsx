import React, { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import '../styles/SurpriseMe.css';  // Ensure to import the CSS file

const randomizePrompt = (genders) => {
  const maleItems = [
    'Shirt', 'Pants', 'Jacket', 'Shorts', 'Sweater', 'Suit', 'T-Shirt', 'Jeans', 'Hoodie', 'Blazer',
    'Coat', 'Tracksuit', 'Vest', 'Overalls', 'Polo Shirt', 'Cargo Pants', 'Cardigan'
  ];
  const femaleItems = [
    'Dress', 'Skirt', 'Blouse', 'Jacket', 'Leggings', 'Top', 'Jeans', 'T-Shirt', 'Sweater', 'Hoodie',
    'Coat', 'Tracksuit', 'Vest', 'Overalls', 'Cardigan', 'Tank Top', 'Midi Dress', 'Maxi Dress'
  ];
  const commonColors = [
    'Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Purple', 'Pink', 'Orange', 'Brown',
    'Grey', 'Beige', 'Navy', 'Maroon', 'Teal', 'Olive', 'Turquoise', 'Coral', 'Lavender', 'Mint'
  ];
  const commonStyles = [
    'Casual', 'Formal', 'Sporty', 'Elegant', 'Vintage', 'Bohemian', 'Chic', 'Preppy', 'Streetwear',
    'Business Casual', 'Gothic', 'Minimalist', 'Athleisure', 'Retro', 'Hipster', 'Grunge', 'Classic'
  ];
  const commonFeatures = [
    'Patterned', 'Plain', 'Striped', 'Polka Dot', 'Floral', 'Embroidered', 'Graphic', 'Ruffled',
    'Sequined', 'Lace', 'Denim', 'Leather', 'Knitted', 'Pleated', 'Fringed', 'Cropped', 'High-Waisted'
  ];

  const items = [];
  if (genders.includes('male')) items.push(...maleItems);
  if (genders.includes('female')) items.push(...femaleItems);
  const getRandomValue = (array) => array[Math.floor(Math.random() * array.length)];

  return {
    item: getRandomValue(items),
    color: getRandomValue(commonColors),
    style: getRandomValue(commonStyles),
    features: getRandomValue(commonFeatures),
    additional: ''
  };
};

const SurpriseMe = ({ onSurprise }) => {
  const [selectedGenders, setSelectedGenders] = useState([]);

  const handleSurpriseMeClick = () => {
    if (selectedGenders.length > 0) {
      const randomPrompt = randomizePrompt(selectedGenders);
      onSurprise(randomPrompt);
    } else {
      alert('Please select at least one gender.');
    }
  };

  const handleGenderToggle = (gender) => {
    setSelectedGenders((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender]
    );
  };

  return (
    <div className="surprise-me-container">
      <div className="gender-buttons">
        <Button
          className={selectedGenders.includes('male') ? 'selected' : ''}
          variant="contained"
          onClick={() => handleGenderToggle('male')}
        >
          Male
        </Button>
        <Button
          className={selectedGenders.includes('female') ? 'selected' : ''}
          variant="contained"
          onClick={() => handleGenderToggle('female')}
        >
          Female
        </Button>
      </div>
      <Button
        onClick={handleSurpriseMeClick}
        variant="contained"
        color="primary"
        style={{ marginTop: '10px' }}
      >
        Surprise Me!
      </Button>
    </div>
  );
};

export default SurpriseMe;
