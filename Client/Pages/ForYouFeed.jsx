import React, { useEffect, useState } from 'react';
import FeedPost from '../components/FeedPost';
import { Box, Container, Typography } from '@mui/material';
import axios from 'axios';
import '../styles/feed.css';

/**
 * Presentational component to render individual posts
 * rendered on click to /feed
 * @returns 
 */
const ForYouFeed = () => {
  // Temporary state for the list of posts
  const [feedPosts, setFeedPosts] = useState([]);

  // useEffect for side effect management when the feed gets mounted (cause), will fetch the posts
  useEffect(() => {
    // Function to load posts
    const fetchData = async () => {
      try {
        // Fetch all matches from the backend
        const response = await axios.get('/api/matches');
        setFeedPosts(response.data);
      } catch (error) {
        console.error('Error fetching feed posts:', error);
      }
    };

    // Call the async requests immediately after declared
    fetchData();
  }, []); // [] - only 1x after initial render

  return (
    <Container>
      <Typography variant="h2" gutterBottom sx={{ mt: 20 }}>
        See what's trending
      </Typography>
      <div className="feed-container">
        {feedPosts.map((feedPost) => (
          <FeedPost key={feedPost.match_id} post={feedPost} />
        ))}
      </div>
    </Container>
  );
};

export default ForYouFeed;
