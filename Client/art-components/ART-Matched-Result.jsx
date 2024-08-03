import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

function MatchedArtResult({ image, currentImageUrl, currentPrompt, userId }) {
  const emptyStarPath = 'M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z';
  const filledStarPath = 'M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z';

  const [fill, setFill] = useState('currentColor');
  const [path, setPath] = useState(emptyStarPath);

    console.log(`Rendering image: ${image.name} with URL: ${image.contentUrl}`);

  let itemName = image.name.length > 50 ? `${image.name.slice(0, 50)}...` : image.name;

  const handleAddToFavorites = async () => {
    try {
      await axios.post('/api/favorite-art-image', {
        userId,
        prompt: currentPrompt,
        imageUrl: currentImageUrl,
        photoUrl: image.contentUrl,
        url: image.hostPageUrl,
        name: image.name,
        title: image.title,
        source: 'Bing'
      });
      setFill('gold');
      setPath(filledStarPath);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const handleClick = () => {
    if (fill === 'currentColor') {
      handleAddToFavorites();
    } else {
      setFill('currentColor');
      setPath(emptyStarPath);
    }
  };

  return (
    <div className='matchedResult'>
      <a href={image.hostPageUrl} target="_blank" rel="noopener noreferrer">
      <img src={image.contentUrl} alt={image.name} className="matchedImage" />
        <br />
        {itemName}
      </a>
      <br />
      <div className="star">
        <svg 
          onClick={handleClick}
          xmlns="http://www.w3.org/2000/svg" 
          width="25" 
          height="25" 
          fill={fill} 
          className="bi bi-star" 
          viewBox="0 0 16 16"
          role="button"
          aria-label={fill === 'currentColor' ? 'Add to favorites' : 'Remove from favorites'}
        >
          <path d={path} />
        </svg>
      </div>
    </div>
  );
}

export default MatchedArtResult;
