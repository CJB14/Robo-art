import React, { useState } from 'react';

const Text2ImgComponent = ({ userId = '', webToken }) => {
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
        body: JSON.stringify({ text, userId }),
      });

      const data = await response.json();
      if (data.success) {
        setImageUrl(data.imageUrl);
      } else {
        console.error('Error:', data.message);
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
