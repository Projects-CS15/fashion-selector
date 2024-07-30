import React from 'react';
import styled from 'styled-components';

// Page container
const PageContainer = styled.div`
  max-width: 1025px;
  padding: 50px;
  margin-top: 50px;
`;

// Container for each favorites row
const FavoritesRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: space-around;
  width: 100%;
  padding: 10px;
  margin: 70px 0; 
`;

// AI Image container
const ImageContainer = styled.div`
  height: 200px;
  width: 400px;
  border-style: solid;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// AI image placeholder
const Placeholder = styled.div`
  width: 90%;
  height: 90%;
  background: #f0f0f0;
`;

// Cards container
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 600px;  
`;

// Single card container
const Card = styled.div`
  height: 165px;
  width: 165px;
  background-color: #f0f0f0;
  margin: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-style: solid;
  border-radius: 2rem;
`;

// Card image
const Image = styled.img`
  height: 100px;
  width: 100px;
  position: relative;
`;

// Label div container
const Label = styled.div`
  margin-top: 15px;
  text-align: center;
`;

// Actual label styling
const RetailerLabel = styled(Label)`
  color: #333;
  font-weight: bold;
`;


// Favorites component
const Favorites = () => {
    return (
        <PageContainer>
            {[...Array(3)].map((_, rowIndex) => (
                <FavoritesRow key={rowIndex}>
                    <ImageContainer>
                        <Placeholder src="https://via.placeholder.com/400x200" />
                    </ImageContainer>
                    <CardContainer>
                        {[...Array(3)].map((_, cardIndex) => (
                            <Card key={cardIndex}>
                                <Image src="https://via.placeholder.com/30" alt="placeholder" />
                                <RetailerLabel>Amazon</RetailerLabel>
                            </Card>
                        ))}
                    </CardContainer>
                </FavoritesRow>
            ))}
        </PageContainer>
    );
};

export default Favorites;