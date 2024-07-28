import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Paper, Button, Typography, Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const SecretCloset = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const token = useSelector((state) => state.user.token);
  const userEmail = useSelector((state) => state.user.email);

  const getImages = async () => {
    try {
      console.log("Fetching images for:", userEmail);
      const response = await fetch("/api/getsaveImg", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      setItems(data);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (token && userEmail) {
      getImages();
    }
  }, [token, userEmail]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : items.length - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex < items.length - 1 ? prevIndex + 1 : 0
    );
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Grid
      container
      spacing={2}
      style={{ backgroundColor: "transparent", margin: "15px" }}
    >
      {items.length > 0 && (
        <>
          <Grid item xs={2}>
            <SideImages
              items={items}
              start={activeIndex - 2}
              end={activeIndex}
            />
          </Grid>
          <Grid item xs={8}>
            <Carousel
              index={activeIndex}
              onChange={(index) => setActiveIndex(index)}
              autoPlay={false}
              animation="slide"
              indicators={false}
              navButtonsAlwaysVisible
              next={handleNext}
              prev={handlePrev}
              className="custom-carousel"
            >
              {items.map((item, index) => (
                <Item key={index} item={item} />
              ))}
            </Carousel>
            <Button
              onClick={handlePrev}
              style={{ position: "absolute", left: "10px", top: "50%" }}
            >
              <ArrowBackIosIcon />
            </Button>
            <Button
              onClick={handleNext}
              style={{ position: "absolute", right: "10px", top: "50%" }}
            >
              <ArrowForwardIosIcon />
            </Button>
          </Grid>
          <Grid item xs={2}>
            <SideImages
              items={items}
              start={activeIndex + 1}
              end={activeIndex + 3}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

const SideImages = ({ items, start, end }) => {
  const getWrappedIndex = (index) => (index + items.length) % items.length;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {[start, start + 1, end].map((index) => (
        <img
          key={index}
          src={items[getWrappedIndex(index)].url}
          alt={`Side item ${index}`}
          style={{ width: "100%", height: "auto", marginBottom: "10px" }}
        />
      ))}
    </div>
  );
};

const Item = ({ item }) => {
  return (
    <div
      className="home pages"
      style={{
        backgroundColor: "transparent",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <Paper
        style={{
          position: "relative",
          margin: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          padding: "1rem",
        }}
      >
        <img
          src={item.url}
          style={{
            height: "400px",
            width: "auto",
            maxWidth: "100%",
            objectFit: "contain",
          }}
          alt="saved pic"
        />
        <Typography variant="subtitle2">
          {/* You can add more details about the item here if needed */}
        </Typography>
      </Paper>
    </div>
  );
};

export default SecretCloset;