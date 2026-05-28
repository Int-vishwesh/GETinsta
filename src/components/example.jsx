import React, { useState } from 'react';
import axios from 'axios';

const Example = () => {
  const [pasteurl, setPasteUrl] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [error, setError] = useState('');

  // Pasting last copied URL
  const paste = () => {
    navigator.clipboard.readText().then((text) => {
      setPasteUrl(text);
    });
  };

  // Displaying message while waiting for the media URL
  const waiting = () => {
    setMediaUrl('');
    setError('');
  };

  // Function to download media (image/video) based on URL
  const download = async () => {
    if (!pasteurl) {
      alert('Please paste a valid Instagram URL.');
      return;
    }

    waiting(); // Reset previous media and errors

    try {
      const response = await axios.post('http://localhost:5001/download', { url: pasteurl });
      const media = response.data.media_url;
      setMediaUrl(media); // Set the media URL to display it
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please check your URL or internet connection.');
    }
  };

  // Handle the click event for downloading media
  const handleClick = () => {
    download();
  };

  return (
    <div className="container">
      <h1 className="headline">Download Instagram Post (Image/Video)</h1>

      <input
        type="text"
        value={pasteurl}
        onChange={(e) => setPasteUrl(e.target.value)}
        placeholder="Paste Instagram URL here"
        className="input-field"
      />

      <button onClick={paste} className="paste-btn">Paste link</button>
      <br />
      <button onClick={handleClick} className="download-btn">Download</button>

      {/* Show error message if any */}
      {error && <p className="error-message">{error}</p>}

      {/* Display the media (image/video) if available */}
      {mediaUrl && (
        <div className="media-display">
          {mediaUrl.endsWith('.mp4') ? (
            <video src={mediaUrl} controls width="500" />
          ) : (
            <img src={mediaUrl} alt="Instagram post" width="500" />
          )}
        </div>
      )}
    </div>
  );
};

export default Example;
