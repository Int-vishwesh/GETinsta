import React, { useState } from 'react';
import axios from 'axios';

const InputStory = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [storyItems, setStoryItems] = useState([]);
  const [error, setError] = useState('');

  // Download stories based on username
  const download = async () => {
    if (!username) {
      alert('Please enter a valid Instagram username.');
      return;
    }

    setLoading(true);
    setStoryItems([]);
    setError('');

    try {
      const response = await axios.post('https://getinsta-backend.onrender.com/download-story', { username: username });
      const stories = response.data.story_urls;

      if (stories && stories.length > 0) {
        setStoryItems(stories);
      } else {
        setError('No stories available for this user.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while fetching stories. Please check the username or internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form action="" method="get" className="items-center w-100 text-center justify-center">
        <p id='headline' className="text-6xl text-[#567c8d] m-10 font-medium max-sm:text-5xl">
          Download <span className='text-[#2f4156] font-black'>insta-stories</span> at one click <br /> no login, no limits
        </p>
        <p className='text-[17px] mb-10 text-[#2f4156] font-medium -mt-8 max-sm:text-[13px]'>
          Fast, Easy &amp; Free <br /> <span>anytime ! anywhere !</span>
        </p>
        <div className='flex flex-row justify-center'>
          <input
            type="text"
            id="pasteurl"
            value={username}
            placeholder="Enter the username of the person whose story you want to download"
            onChange={(e) => setUsername(e.target.value)}
            className="w-[800px] text-center px-5 py-1 border-gray-400 border-2 rounded-[90px] justify-center items-center bg-[#f5efeb] max-sm:w-[400px] max-sm:text-[15px] max-sm:py-0.5"
          />
          <span className='bg-gray-400 text-[#2f4156] -ml-[42px] rounded-[50%] p-2 text-xl'>
            <i className="fa-solid fa-link"></i>
          </span>
        </div>
        <br />
        <button
          type="button"
          onClick={download}
          disabled={loading}
          className="text-[18px] font-medium rounded-[100px] m-1 px-5 py-2 -mt-5 border-[2px] text-[#fff] bg-[#567c8d] border-[#567c8d] hover:bg-[#2f4156] max-sm:text-[15px] max-sm:px-3 max-sm:py-1"
        >
          {loading ? 'Fetching...' : 'Download'}
        </button>
      </form>

      {/* Result display */}
      <div className='flex flex-col justify-center text-center items-center mt-10'>
        {loading && <p className='text-[#567c8d]'>Getting stories...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        {storyItems.length > 0 && (
          <>
            <p className='text-[#2f4156] mb-4'>Your stories are ready to download below:</p>
            {storyItems.map((item, index) => (
              <div key={index} className='mb-6'>
                {item.type === 'video' ? (
                  <video src={item.url} controls style={{ maxWidth: '400px', width: '100%' }}></video>
                ) : (
                  <img src={item.url} alt={`Story ${index + 1}`} style={{ maxWidth: '400px', width: '100%' }} />
                )}
                <br />
                <a href={item.url} target="_blank" rel="noopener noreferrer"
                  className="mt-2 mb-4 inline-block text-[14px] font-medium rounded-[100px] px-4 py-1.5 border-[2px] text-[#fff] bg-[#2f4156] border-[#2f4156] hover:bg-[#567c8d] no-underline">
                  Open story {index + 1} ↗
                </a>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default InputStory;
