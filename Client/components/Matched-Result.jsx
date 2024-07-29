import React from 'react';

function MatchedResult({ image }) {
  console.log(`Rendering image: ${image.name} with URL: ${image.contentUrl}`);

  return (
    <div>
      <img src={image.contentUrl} alt={image.name} />
    </div>
  );
}

export default MatchedResult;
