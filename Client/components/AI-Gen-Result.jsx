import React from 'react';

function AIGenResult({ imageUrl, onTryAgainClick, onFindMatchingItemsClick }) {
  return (
    <div className="generated-image">
      <img src={imageUrl} alt="Generated" className="generatedImg" height="300px" />
      <br />
      <button onClick={onTryAgainClick}>Try Again</button>
      <button onClick={onFindMatchingItemsClick}>Find Matching Items</button>
    </div>
  );
}

export default AIGenResult;
