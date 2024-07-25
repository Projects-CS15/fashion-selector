import React from 'react';

function ImageResults({ bingData }) {
  return (
    <div>
      <h2>Similar Images</h2>
      <div>
        {bingData.map((image, index) => (
          <img key={index} src={image.url} alt={image.title} />
        ))}
      </div>
    </div>
  );
}

export default ImageResults;
