import React, { useEffect } from 'react';
import MatchedResult from './Matched-Result';

function MatchedResults({ bingData }) {
  useEffect(() => {
    console.log('MatchedResults component loaded');
    console.log('Number of results:', bingData.length);
    console.log('bingData:', bingData);
  }, [bingData]);

  return (
    <div className="image-results">
      <h2>Similar Images</h2>
      <div>
        {bingData.map((image, index) => (
          <MatchedResult key={index} image={image} />
        ))}
      </div>
    </div>
  );
}

export default MatchedResults;
