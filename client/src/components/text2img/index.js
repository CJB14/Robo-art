import React, { useState } from 'react';

<<<<<<< HEAD
const Text2ImgComponent = ({ userId = '', webToken }) => {
=======
//pass token as param
const Text2ImgComponent = ({  }) => {
>>>>>>> 98f3121fabe189867627aaaa568e74b0447f719f
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const generateImg = async () => {
    try {
      const response = await fetch('/api/text2img', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${webToken}`,
        },
<<<<<<< HEAD
        body: JSON.stringify({ text, userId }),
=======
        body: JSON.stringify({ text, 
        //userId
        }),
>>>>>>> 98f3121fabe189867627aaaa568e74b0447f719f
      });

      const data = await response.json();
      if (data.success) {
        console.log(data);
        setImageUrl(data.imageUrl);
        console.log(data.imageUrl);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong');
    }
  };

  return (
    <div className="text2img-container">
      {imageUrl ? (
        <img src={imageUrl} alt="Generated Image" />
      ) : (
        <>
          <textarea value={text} onChange={handleTextChange} className="text-input" />

          <button onClick={generateImg} className="search-btn">
            Generate
          </button>
        </>
      )}

      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Text2ImgComponent;
