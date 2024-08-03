import React, { useState } from 'react';


function SpeechRecognition({ formId, setter }) {
  const [buttonLabel, setButtonLabel] = useState('Voice input');
  const [transcript, setTranscript] = useState('');
  
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    setButtonLabel('Listening...');
  };

  recognition.onresult = (event) => {
    const transcriptVar = event.results[0][0].transcript;
    setTranscript(transcriptVar);
    setter(transcriptVar);
  };

  recognition.onend = () => {
    setButtonLabel('Voice input');
  };

  return (
    <>
      <button 
        className='speechButton'
        id={formId}
        onClick={() => { recognition.start() }}
      >
        {buttonLabel}
      </button>
    </>
  );
};

export default SpeechRecognition;
