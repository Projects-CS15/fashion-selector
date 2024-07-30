import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Box, Button } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const FeedPost = ({ post }) => {
  return (
    <Card className="feed-post" sx={{ display: 'flex', mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 151, cursor: 'pointer' }}
        image={post.imageUrl}
        alt={post.title}
        onClick={() => alert(`Clicked on ${post.title}`)} // Placeholder for click action
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '10px' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="p">
            {post.content}
          </Typography>
          <Typography variant="body2" color="text.primary" component="p" sx={{ mt: 1 }}>
            Posted by: {post.userName}
          </Typography>
        </CardContent>
        <Box className="post-info">
          <Button variant="outlined" onClick={() => alert(`Learn more about ${post.title}`)}>
            Learn More
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label="favorite">
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
