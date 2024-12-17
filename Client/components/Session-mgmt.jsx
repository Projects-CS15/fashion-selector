import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SessionTimeoutChecker() {
  const [showModal, setShowModal] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('/api/session-status') // to do: make endpoint in server
        .then(response => {
          const { countdownModal } = response.data;
          if (countdownModal && countdownModal.show) {
            setShowModal(true);
            setSecondsLeft(countdownModal.secondsLeft);
          } else {
            setShowModal(false);
          }
        })
        .catch(error => console.error('Error fetching session status', error));
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  return showModal ? <SessionTimeoutModal secondsLeft={secondsLeft} /> : null;
}l