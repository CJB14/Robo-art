import React, { useState } from 'react';

const Text2ImgComponent = ({ userId }) => {
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
        },
        body: JSON.stringify({ text, userId}),
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
    <div>
       {imageUrl ? (
        <img src={imageUrl} alt="Generated Image" />
      ) : (
        <>
          <textarea value={text} onChange={handleTextChange} />

          <button onClick={generateImg}>Generate Image</button>
        </>
      )}

      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Text2ImgComponent;