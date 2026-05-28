import React, { useState } from 'react';
import axios from 'axios';

const InputPfp = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [pfpUrl, setPfpUrl] = useState('');
  const [error, setError] = useState('');

  //download profile pic
  const download = async () => {
    if (!username) {
      alert('Please enter a valid Instagram username.');
      return;
    }

    setLoading(true);
    setPfpUrl('');
    setError('');

    try {
      const response = await axios.post('https://getinsta-backend.onrender.com/download-pfp', { username: username });
      const url = response.data.pfp_url;

      if (url) {
        setPfpUrl(url);
      } else {
        setError('Could not fetch profile picture.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while fetching the profile picture. Please check the username or internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form action="" method="get" className="items-center w-100 text-center justify-center">
        <p id='headline' className="text-6xl text-[#567c8d] m-10 font-medium max-sm:text-5xl">
          Download <span className='text-[#2f4156] font-black'>profile-pic</span> at one click  <br /> no login, no limits </p>

        <p className='text-[17px] mb-10 text-[#2f4156] font-medium -mt-8 max-sm:text-[13px]' >Fast, Easy &amp; Free <br /> <span>anytime ! anywhere !</span></p>
        <div className='flex flex-row justify-center'>
          <input
            type="text" id="pasteurl" value={username} placeholder="enter the Instagram username (e.g. virat.kohli)"
            onChange={(e) => setUsername(e.target.value)}
            className="w-[800px] text-center px-5 py-1 border-gray-400 border-2 rounded-[90px] justify-center items-center bg-[#f5efeb] max-sm:w-[400px] max-sm:text-[15px] max-sm:py-0.5 " />
          <span className='bg-gray-400 text-[#2f4156] -ml-[42px] rounded-[50%] p-2 text-xl '> <i className="fa-solid fa-user"> </i> </span>
        </div>
        <br />
        <button
          type="button" onClick={download} disabled={loading}
          className="text-[18px] font-medium rounded-[100px] m-1 px-5 py-2 -mt-5 border-[2px] text-[#fff] bg-[#567c8d] border-[#567c8d] hover:bg-[#2f4156] max-sm:text-[15px] max-sm:px-3 max-sm:py-1">
          {loading ? 'Fetching...' : 'Download'}
        </button>
      </form>

      {/* Result display */}
      <div className='flex flex-col justify-center text-center items-center mt-10'>
        {loading && <p className='text-[#567c8d]'>Getting profile picture...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        {pfpUrl && (
          <>
            <p className='text-[#2f4156] mb-4'>Profile picture is ready to download</p>
            <img src={pfpUrl} alt="Profile Picture" style={{ maxWidth: '320px', width: '100%', borderRadius: '50%' }} />
            <a href={pfpUrl} target="_blank" rel="noopener noreferrer"
              className="mt-4 text-[16px] font-medium rounded-[100px] px-5 py-2 border-[2px] text-[#fff] bg-[#2f4156] border-[#2f4156] hover:bg-[#567c8d] no-underline">
              Open full size ↗
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default InputPfp;
