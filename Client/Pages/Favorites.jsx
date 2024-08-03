import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import FavoriteItem from '../components/FavoriteItem';

const PageContainer = styled.div`
  max-width: 1025px;
  padding: 50px;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

const NoFavoritesMessage = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
`;

const Favorites = ({ userId }) => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      console.log('Fetching favorites for userId:', userId);
      try {
        const response = await axios.post('/api/favorites', { userId });
        console.log('Fetched favorites:', response.data);
        setFavorites(response.data);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError(err);
      }
    };

    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  if (error) {
    return <ErrorMessage>Error fetching favorites: {error.message}</ErrorMessage>;
  }

  // Group favorites by AI image prompt
  const groupedFavorites = favorites.reduce((acc, favorite) => {
    const prompt = JSON.stringify(favorite.prompt); // Convert prompt to a string for easy grouping
    if (!acc[prompt]) {
      acc[prompt] = {
        prompt: favorite.prompt,
        imageUrl: favorite.imageUrl,
        matchedImages: [],
      };
    }
    acc[prompt].matchedImages.push(...favorite.matchedImages);
    return acc;
  }, {});

  const formattedFavorites = Object.values(groupedFavorites);

  return (
    <PageContainer>
      {formattedFavorites.length === 0 ? (
        <NoFavoritesMessage>No favorites found</NoFavoritesMessage>
      ) : (
        formattedFavorites.map((favorite, index) => (
          <FavoriteItem key={index} favorite={favorite} />
        ))
      )}
    </PageContainer>
  );
};

export default Favorites;
