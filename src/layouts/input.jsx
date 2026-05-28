import React, { useState } from 'react';
import axios from 'axios';

const Input = () => {
  const [pasteurl, setPasteUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  //pasting last copied
  const paste = () => {
    navigator.clipboard.readText().then((text) => {
      setPasteUrl(text);
    });
  };

  //download reel
  const download = async () => {
    if (!pasteurl) {
      alert('Please paste a valid Instagram reel URL.');
      return;
    }

    setLoading(true);
    setResult(null);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/download', { url: pasteurl });
      const reelUrl = response.data.reel_url;
      setResult(reelUrl);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while fetching the reel. Please check your URL or internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form action="" method="get" className="items-center w-100 text-center justify-center">
        <p id='headline' className="text-6xl text-[#567c8d] m-10 font-medium max-sm:text-5xl">
          Download <span className='text-[#2f4156] font-black'>reel</span> at one click  <br /> no login, no limits </p>
        <p className='text-[17px] mb-10 text-[#2f4156] font-medium -mt-8 max-sm:text-[13px]' >Fast, Easy &amp; Free <br /> <span>anytime ! anywhere !</span></p>
        <div className='flex flex-row justify-center'>
          <input
            type="text" id="pasteurl" value={pasteurl} placeholder="paste your copied URL or link of instagram reel in this box"
            onChange={(e) => setPasteUrl(e.target.value)}
            className="w-[800px] text-center px-5 py-1 border-gray-400 border-2 rounded-[90px] justify-center items-center bg-[#f5efeb] max-sm:w-[400px] max-sm:text-[15px] max-sm:py-0.5 " />
          <span className='bg-gray-400 text-[#2f4156] -ml-[42px] rounded-[50%] p-2 text-xl '> <i className="fa-solid fa-link"> </i> </span>
        </div>
        <br />
        <button
          type="button" onClick={paste}
          className="text-[18px] rounded-[100px] m-3 px-5 py-2 -mt-5 border-[2px] text-[#567c8d] border-[#567c8d] hover:bg-[#567c8d] hover:text-white max-sm:text-[13px] max-sm:px-3 max-sm:py-0.5 ">
          Paste link <i className="fa-regular fa-copy"></i>
        </button>
        <button
          type="button" onClick={download} disabled={loading}
          className="text-[18px] font-medium rounded-[100px] m-1 px-5 py-2 -mt-5 border-[2px] text-[#fff] bg-[#567c8d] border-[#567c8d] hover:bg-[#2f4156] max-sm:text-[15px] max-sm:px-3 max-sm:py-1">
          {loading ? 'Downloading...' : 'Download'}
        </button>
      </form>

      {/* Result display */}
      <div className='flex flex-col justify-center text-center items-center mt-10'>
        {loading && <p className='text-[#567c8d]'>Getting your reel...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        {result && (
          <>
            <p className='text-[#2f4156] mb-4'>Your reel is ready to download below</p>
            <video src={result} controls style={{ maxWidth: '500px', width: '100%' }}></video>
            <a href={result} target="_blank" rel="noopener noreferrer"
              className="mt-4 text-[16px] font-medium rounded-[100px] px-5 py-2 border-[2px] text-[#fff] bg-[#2f4156] border-[#2f4156] hover:bg-[#567c8d] no-underline">
              Open in new tab ↗
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
