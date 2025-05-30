import React, { link, useState } from 'react';
import axios from 'axios';

const InputPost = () => {
  const [pasteurl, setPasteUrl] = useState('');

  //pasting last copied
  const paste = () => {
    navigator.clipboard.readText().then((text) => {
      setPasteUrl(text);
    });
  };

  //during fetching
  const waiting = () => {
    const displayReelDiv = document.getElementById('displayreel');
    displayReelDiv.innerHTML = "<p>Getting your reel...</p>";
  };
  
  //download reel
  const download = async () => {
    if (!pasteurl) {
      alert('Please paste a valid Instagram reel URL.');
      return;
    }

    try {
      const response = await axios.post('https://getinsta-backend.onrender.com/download', { url: pasteurl });
      const reelUrl = response.data.reel_url;

      // Show the reel
      const displayReelDiv = document.getElementById('displayreel');
      displayReelDiv.innerHTML = `<p> your reel is ready to download <br> below </p> <br> <video src="${reelUrl}" controls ></video>`;
    } 
    catch (error) {
      alert(error.response?.data?.error || 'An error occurred while fetching the reel. please check your URL or internet connection ');
    }
  };

  // on clicking download btn
  const handleClick = () => {
    waiting(); 
    download();
  };



  return (
    <div>
      <form action="" method="get" className="items-center w-100 text-center justify-center">
        <p id='headline' className="text-6xl text-[#567c8d] m-10 font-medium max-sm:text-5xl">
          Download <span className='text-[#2f4156] font-black'>insta-posts</span> at one click  <br /> no login, no limits </p>
    
        <p className='text-[17px] mb-10 text-[#2f4156] font-medium -mt-8 max-sm:text-[13px]' >Fast, Easy & Free <br /> <span>anytime ! anywhere !</span></p>
        <div className='flex flex-row justify-center'>
          <input
            type="text" id="pasteurl" value={pasteurl} placeholder="paste your copied URL or link of instagram reel in this box"
            onChange={(e) => setPasteUrl(e.target.value)} // Update on input change
            className="w-[800px] text-center px-5 py-1 border-gray-400 border-2 rounded-[90px] justify-center items-center bg-[#f5efeb] max-sm:w-[400px] max-sm:text-[15px] max-sm:py-0.5 " />
          <span className='bg-gray-400 text-[#2f4156] -ml-[42px] rounded-[50%] p-2 text-xl '> <i class="fa-solid fa-link"> </i> </span>
        </div>
        <br />
        <button
          type="button" onClick={paste}
          className="text-[18px] rounded-[100px] m-3 px-5 py-2 -mt-5 border-[2px] text-[#567c8d] border-[#567c8d] hover:bg-[#567c8d] hover:text-white max-sm:text-[13px] max-sm:px-3 max-sm:py-0.5 ">
          Paste link <i class="fa-regular fa-copy"></i>
        </button>
        <button
          type="button" onClick={handleClick}
          className="text-[18px] font-medium rounded-[100px] m-1 px-5 py-2 -mt-5 border-[2px] text-[#fff] bg-[#567c8d] border-[#567c8d] hover:bg-[#2f4156] max-sm:text-[15px] max-sm:px-3 max-sm:py-1">
          Download
        </button>
      </form>

      {/* shown and download here */}
      <div id="displayreel" className='flex flex-col justify-center text-center items-center mt-10'>
        
      </div>
    </div>
  );
};

export default InputPost;
