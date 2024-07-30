import React from 'react';
import styled from 'styled-components';

// page container

const PageContainer = styled.div`

    max-width: 1025px;
    padding: 20px;
    margin-top: 100px;

`;

// favorites container 
const FavoritesContainer = styled.div`
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: space-around;
    height: 200px;
    width: 1000px;
    padding: 10px;
    margin: 0 auto;

`;

// image container
const ImageContainer = styled.div`

    height: 200px;
    width: 400px;
    border-style: solid;

`;

// cards sidebar 
const CardContainer = styled.aside`
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 100px;
    height: 200px;
    width: 600px;

`;

const Card = styled.div`
    
    height: 200px;
    width: 200px;
    background-color: #D9D9D9;
    border-style: solid;
    border-radius: 2rem;

`;


const Image = styled.img`

    height: 30px;
    width: 30px;

`;


const Favorites = () => {


    return (
        <div>

            <PageContainer>
                <FavoritesContainer>
                    <ImageContainer />
                    <CardContainer>
                        <Card><Image /></Card>
                        <Card><Image /></Card>
                        <Card><Image /></Card>
                    </CardContainer>
                </FavoritesContainer>
            </PageContainer>


        </div>


    )

}

export default Favorites;