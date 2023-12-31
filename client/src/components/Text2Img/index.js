import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {TEXT_2_IMG } from '../../utils/mutations.js'

//pass token as param
const Text2ImgComponent = ({  }) => {
  const [text, setText] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [error, setError] = useState('');
  const [text2img, { error: imgError }] = useMutation(TEXT_2_IMG);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const generateImg = async () => {
  
    try {
      const mutationResponse = await text2img({
        variables: { text: text },
      }); 
      console.log(mutationResponse)
        setImageURL(mutationResponse.data.text2img.imageURL);
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong');
    }
  };

  return (
    <div className="text2img-container">
       {imageURL ? (
        <img src={imageURL} alt="Generated Image" />
      ) : (
        <>
          <textarea value={text} onChange={handleTextChange} className="text-input" />

          <button onClick={generateImg} className="search-btn">Generate Image</button>
        </>
      )}

      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Text2ImgComponent;