
import React, { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import '../styles/SurpriseMe.css';  //

function SurpriseMe({ onSurprise, handleButtonClick, activeButtons }) {
  const [selectedGenders, setSelectedGenders] = useState([]);

  const handleSurpriseMeClick = () => {
    if (selectedGenders.length > 0) {
      const randomPrompt = randomizePrompt(selectedGenders);
      onSurprise(randomPrompt);
      handleButtonClick('surpriseMe');
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

  return (
    <div className="surprise-me-container">
      <div className="gender-buttons">
        <button
          className={selectedGenders.includes('male') ? 'active' : ''}
          onClick={() => {
            handleGenderToggle('male');
            handleButtonClick('male');
          }}
        >
          Male
        </button>
        <button
          className={selectedGenders.includes('female') ? 'active' : ''}
          onClick={() => {
            handleGenderToggle('female');
            handleButtonClick('female');
          }}
        >
          Female
        </button>
      </div>
      <button
        onClick={handleSurpriseMeClick}
        className={activeButtons['surpriseMe'] ? 'active' : ''}
      >
        Surprise Me!
      </button>
    </div>
  );
}

export default SurpriseMe;
