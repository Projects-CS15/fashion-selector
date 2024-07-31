import React from 'react';
import styled from 'styled-components';

const Container = styled.section`

    display: flex;
    justify-content: center;
    align-items: center; 
    margin: 50px;

`;

const Header = styled.h2`

color: white;
font-size: 24px;
margin-bottom: 10px;
margin-left: 40px;

`;


const Sentence = styled.ul`

color: white;
font-size: 15px;

`;


const AboutPage = () => {


    return (

        <Container>
            <div>

                <Header>About Style Selector</Header>

                <Sentence>Style Selector is your AI-powered style assistant, designed to help you discover and refine your personal aesthetic.</Sentence>

                <Sentence>Our mission is to make style accessible and enjoyable for everyone. Whether you're seeking outfit inspiration, curating your home decor, or exploring art that resonates with you, Style Selector is here to guide you.</Sentence>

                <Sentence>Explore, experiment, and express yourself through fashion, furniture, and art with us!</Sentence>

            </div>
        </Container>
    )

}

export default AboutPage;