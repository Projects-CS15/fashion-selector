import React, { useEffect, useState} from "react";



const ImageFetcher = ({ updateItems }) => {

  // const [savedImageUrls, setSavedImageUrls] = useState([]);

  // const getImages = async () => {

    //   try {
    //     const response = await fetch('/api/getsaveImg');
    //   //   const data = await response.json();
    //   //   console.log('data is this',data.images)
    //   const data = await response.json();
    //   setSavedImageUrls(data);

      
    //   } catch (error) {
    //     console.error(error);
    //     return [];
    //   }
    // };
    // useEffect(() => {
  
    //   getImages();
    // }, []);

  // useEffect(() => {
  //   // Simulating an API call with setTimeout
  //   setTimeout(() => {
  //     const fetchedItems = [
  //       {
  //         photo: carousel1,
  //         description: 'Photo by minhphamdesign @Unsplash',
  //         artist: 'https://unsplash.com/@minhphamdesign',
  //       },
  //       {
  //         photo: carousel2,
  //         description: 'Photo by minhphamdesign @Unsplash',
  //         artist: 'https://unsplash.com/@minhphamdesign',
  //       },
  //       {
  //         photo: carousel3,
  //         description: 'Photo by minhphamdesign @Unsplash',
  //         artist: 'https://unsplash.com/@minhphamdesign',
  //       },
  //       {
  //         photo: carousel4,
  //         description: 'Photo by minhphamdesign @Unsplash',
  //         artist: 'https://unsplash.com/@minhphamdesign',
  //       },
  //       {
  //         photo: carousel5,
  //         description: 'Photo by minhphamdesign @Unsplash',
  //         artist: 'https://unsplash.com/@minhphamdesign',
  //       },
  //     ];
  //     updateItems(fetchedItems);
  //   }, 1000); // Simulate a 1-second delay
  // }, [updateItems]);

  return null; // This component doesn't render anything
};

export default ImageFetcher;