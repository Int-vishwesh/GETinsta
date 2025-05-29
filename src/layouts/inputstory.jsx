import React, { useState } from 'react';
import axios from 'axios';

const InputStory = () => {
  const [pasteurl, setPasteUrl] = useState('');

  // Show a message while fetching stories
  const waiting = () => {
    const displayReelDiv = document.getElementById('displayreel');
    displayReelDiv.innerHTML = "<p>Getting your stories...</p>";
  };

  // Download stories based on username
  const download = async () => {
    if (!pasteurl) {
      alert('Please enter a valid Instagram username.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/download-story', { username: pasteurl });
      const storyUrls = response.data.story_urls;

      if (storyUrls && storyUrls.length > 0) {
        const displayReelDiv = document.getElementById('displayreel');
        displayReelDiv.innerHTML = `<p>Your stories are ready to download below:</p>`;

        storyUrls.forEach((url, index) => {
          const isVideo = url.endsWith('.mp4');
          const mediaElement = isVideo
            ? `<video src="${url}" controls style="width: 100%; height: auto; margin: 10px 0;"></video>`
            : `<img src="${url}" alt="Story ${index}" style="width: 100%; height: auto; margin: 10px 0;" />`;

          displayReelDiv.innerHTML += mediaElement;
        });
      } else {
        alert('No stories available for this user.');
      }
    } catch (error) {
      alert(error.response?.data?.error || 'An error occurred while fetching the story. Please check the username or internet connection.');
    }
  };

  // Handle the download button click
  const handleClick = () => {
    waiting();
    download();
  };

  return (
    <div>
      <form action="" method="get" className="items-center w-100 text-center justify-center">
        <p id='headline' className="text-6xl text-[#567c8d] m-10 font-medium max-sm:text-5xl">
          Download <span className='text-[#2f4156] font-black'>insta-stories</span> at one click <br /> no login, no limits
        </p>
        <p className='text-[17px] mb-10 text-[#2f4156] font-medium -mt-8 max-sm:text-[13px]'>
          Fast, Easy & Free <br /> <span>anytime ! anywhere !</span>
        </p>
        <div className='flex flex-row justify-center'>
          <input
            type="text"
            id="pasteurl"
            value={pasteurl}
            placeholder="Enter the username of the person whose story you want to download"
            onChange={(e) => setPasteUrl(e.target.value)} // Update on input change
            className="w-[800px] text-center px-5 py-1 border-gray-400 border-2 rounded-[90px] justify-center items-center bg-[#f5efeb] max-sm:w-[400px] max-sm:text-[15px] max-sm:py-0.5"
          />
          <span className='bg-gray-400 text-[#2f4156] -ml-[42px] rounded-[50%] p-2 text-xl'>
            <i className="fa-solid fa-link"></i>
          </span>
        </div>
        <br />
        <button
          type="button"
          onClick={handleClick}
          className="text-[18px] font-medium rounded-[100px] m-1 px-5 py-2 -mt-5 border-[2px] text-[#fff] bg-[#567c8d] border-[#567c8d] hover:bg-[#2f4156] max-sm:text-[15px] max-sm:px-3 max-sm:py-1"
        >
          Download
        </button>
      </form>

      {/* Shown and download here */}
      <div id="displayreel" className='flex flex-col justify-center text-center items-center mt-10'>
      </div>
    </div>
  );
};

export default InputStory;
