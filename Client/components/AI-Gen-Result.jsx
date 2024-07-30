import React from 'react';

function AIGenResult({ imageUrl, onTryAgainClick, onFindMatchingItemsClick }) {
  return (
    <div className="generated-image">
      <div>
        <img src={imageUrl} alt="Generated" className="generatedImg"/>
      </div>
      <div className="imgBtnContainer">
        <button onClick={onTryAgainClick}>Generate new image</button>
        <button onClick={onFindMatchingItemsClick}>Find matching items</button>
      </div>
    </div>
  );
}

export default AIGenResult;
