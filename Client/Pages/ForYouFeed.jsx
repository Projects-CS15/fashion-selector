import React, { useEffect, useState } from 'react';
import FeedPost from '../components/FeedPost';
import { Box, Container, Typography } from '@mui/material';
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
      // Simulate network requests for getting all the posts -- pause fetchData execution
      // until the promise resolves after the callback timer waits 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Set the state to the posts we got
      setFeedPosts(generatePosts());
    };
    // Call the async requests immediately after declared
    // Promise resolves after second (exponential, )
    fetchData();
  }, []); // [] - only 1x after initial render

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        See what's trending
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Subheading
      </Typography>
      <div className="feed-container">
        {feedPosts.map((feedPost) => (
          <FeedPost key={feedPost.id} post={feedPost} />
        ))}
      </div>
    </Container>
  );
};

/**
 * TESTING DATA
 * @returns 
 */
const generatePosts = () => {
  const titles = ['First Post', 'Second Post', 'Third Post'];
  return titles.map((title, index) => ({
    id: index + 1, // Post ID
    userId: index + 100,
    title,
    content: `${title} content`,
    imageUrl: 'https://via.placeholder.com/150',
    userName: `User ${index + 1}`,
    heartCount: Math.floor(Math.random() * 10),
  }));
};

export default ForYouFeed;
