import React, { useState } from 'react';
import axios from 'axios';

const InputPost = () => {
  const [pasteurl, setPasteUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);
  const [error, setError] = useState('');

  //pasting last copied
  const paste = () => {
    navigator.clipboard.readText().then((text) => {
      setPasteUrl(text);
    });
  };

  //download post
  const download = async () => {
    if (!pasteurl) {
      alert('Please paste a valid Instagram post URL.');
      return;
    }

    setLoading(true);
    setMediaItems([]);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/download-post', { url: pasteurl });
      const media = response.data.media;

      if (media && media.length > 0) {
        setMediaItems(media);
      } else {
        setError('No media found in this post.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while fetching the post. Please check your URL or internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form action="" method="get" className="items-center w-100 text-center justify-center">
        <p id='headline' className="text-6xl text-[#567c8d] m-10 font-medium max-sm:text-5xl">
          Download <span className='text-[#2f4156] font-black'>insta-posts</span> at one click  <br /> no login, no limits </p>
    
        <p className='text-[17px] mb-10 text-[#2f4156] font-medium -mt-8 max-sm:text-[13px]' >Fast, Easy &amp; Free <br /> <span>anytime ! anywhere !</span></p>
        <div className='flex flex-row justify-center'>
          <input
            type="text" id="pasteurl" value={pasteurl} placeholder="paste the URL of the Instagram post you want to download"
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
        {loading && <p className='text-[#567c8d]'>Getting your post...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        {mediaItems.length > 0 && (
          <>
            <p className='text-[#2f4156] mb-4'>Your post is ready to download below</p>
            {mediaItems.map((item, index) => (
              <div key={index} className='mb-6'>
                {item.type === 'video' ? (
                  <video src={item.url} controls style={{ maxWidth: '500px', width: '100%' }}></video>
                ) : (
                  <img src={item.url} alt={`Post media ${index + 1}`} style={{ maxWidth: '500px', width: '100%' }} />
                )}
                <a href={item.url} target="_blank" rel="noopener noreferrer"
                  className="mt-2 mb-4 inline-block text-[14px] font-medium rounded-[100px] px-4 py-1.5 border-[2px] text-[#fff] bg-[#2f4156] border-[#2f4156] hover:bg-[#567c8d] no-underline">
                  Open {item.type} {index + 1} ↗
                </a>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default InputPost;
