import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Box, Button } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const FeedPost = ({ post }) => {
  return (
    <Card className="feed-post" sx={{ display: 'flex', mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 151, cursor: 'pointer' }}
        image={post.photo_url || 'https://via.placeholder.com/150'}
        alt={post.name}
        onClick={() => alert(`Clicked on ${post.title}`)} // Placeholder for click action
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '10px' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {post.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="p">
            {post.source}
          </Typography>
        </CardContent>
        <Box className="post-info">
          <Button
            variant="outlined"
            sx={{
              backgroundColor: '#000', /* Black background */
              color: '#fff', /* White text */
              '&:hover': {
                backgroundColor: '#333', /* Dark gray background */
                color: '#fff', /* White text */
              },
            }}
            onClick={() => window.open(post.url, '_blank', 'noopener noreferrer')}
          >
            Learn More
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              aria-label="favorite"
              sx={{
                color: '#000', /* Black background */
                '&:hover': {
                  color: '#333', /* Dark gray background */
                },
              }}
            >
              <StarBorderIcon />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {post.heartCount}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default FeedPost;
