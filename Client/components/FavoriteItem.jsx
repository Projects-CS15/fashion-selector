import React from 'react';
import styled from 'styled-components';

const FavoritesRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 20px;
  margin: 20px 0;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 300px;
  border: 1px solid #ccc;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  margin-right: 40px;
  background-color: #f9f9f9;
`;

const Placeholder = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const Unavailable = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #ccc;
  color: #555;
  text-align: center;
`;

const LabelContainer = styled.div`
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const PromptText = styled.div`
  margin-top: 10px;
  text-align: center;
  font-size: 16px;
  color: #555;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: calc(100% - 340px);
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 10px;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #ccc;
  }
`;

const Card = styled.a`
  height: 250px;
  width: 200px;
  background-color: #f0f0f0;
  margin: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 10px;
  flex: 0 0 auto;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
    border-color: #999;
  }
`;

const Image = styled.img`
  height: 150px;
  width: 150px;
  object-fit: cover;
  border-radius: 5px;
`;

const Label = styled.div`
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
`;

const RetailerLabel = styled(Label)`
  color: #333;
  font-weight: bold;
`;

const generateDescription = (prompt) => {
  const { item, color, style, features } = prompt || {};
  let description = '';
  if (color) description += `${color} `;
  if (style) description += `${style} `;
  if (features) description += `${features} `;
  if (item) description += `${item}`;
  return description.trim();
};

const generateLabel = (prompt) => {
  const { item, color, style, features } = prompt || {};
  return `${color}, ${style} ${item} with ${features} Features`.trim();
};

const FavoriteItem = ({ favorite }) => {
  console.log('Favorite Prompt:', favorite.prompt);  // Debugging statement
  const parsed = JSON.parse(favorite.prompt);
  const description = generateDescription(parsed);
  const label = generateLabel(parsed);
  console.log('Generated Description:', description);  // Debugging statement
  console.log('Generated Label:', label);  // Debugging statement

  return (
    <FavoritesRow>
      <ImageContainer>
        <LabelContainer>
          {description && <PromptText>{description}</PromptText>}
        </LabelContainer>
        {favorite.imageUrl ? (
          <Placeholder
            src={favorite.imageUrl}
            onError={(e) => (e.target.src = 'https://via.placeholder.com/300')}
          />
        ) : (
          <Unavailable>Match Unavailable</Unavailable>
        )}
      </ImageContainer>
      <CardContainer>
        {favorite.matchedImages && favorite.matchedImages.length > 0 ? (
          favorite.matchedImages.map((image, idx) => (
            <Card key={idx} href={image.url} target="_blank" rel="noopener noreferrer">
              <Image
                src={image.photoUrl || 'https://via.placeholder.com/150'}
                alt="placeholder"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
              />
              <RetailerLabel>{image.name}</RetailerLabel>
              <Label>{image.title}</Label>
            </Card>
          ))
        ) : (
          <div>No matched images found</div>
        )}
      </CardContainer>
    </FavoritesRow>
  );
};

export default FavoriteItem;
