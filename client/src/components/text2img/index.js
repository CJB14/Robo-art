import React, { useState } from 'react';

const text2imgComponent = () => {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleGenerateImage = async () => {
    try {
      const response = await fetch('/api/text2img', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (data.success) {
        setImageUrl(data.imageUrl);
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <textarea value={text} onChange={handleTextChange} />

      <button onClick={handleGenerateImage}>Generate Image</button>

      {imageUrl && <img src={imageUrl} alt="Generated Image" />}
    </div>
  );
};

export default text2imgComponent;
