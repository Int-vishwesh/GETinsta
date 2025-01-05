
const About = () => {
  return (
    <div>
      <h5 className='text-center text-2xl font-semibold text-[#2f4156]'> how to download reel ?</h5>
      <br />
      {/* steps */}
      <div id='steps' className='flex justify-evenly top-0 max-sm:flex-col max-sm:items-center '>
        <div>
          <img src="reel.png" alt=""/>
          <p><b>step 1 :</b> go to instagram and open the reel that you want to download</p>
        </div>
        <div>
          <img src="link.png" alt="" />
          <p><b>step 2 :</b> tap the three dots on the top right corner and tap on LINK to copy the reel</p>
        </div>
        <div>
          <img src="down.png" alt="" />
          <p><b>step 3 : </b> paste that copied link here and tap on download button and your done</p>
        </div>
      </div>
      {/* choose us */} 
      <div id="whyus" className="">
        <p className="mt-20 ml-5 text-[#2f4156] pl-56 text-4xl font-bold max-sm:pl-5 max-sm:text-2xl"> Why choose us ?</p>
        <div>
          <img src="quality.png" alt="" className="W-96"/>
          <p><span className="font-semibold text-2xl max-sm:text-xl">Original Quality</span><br />this will let you download the reel in original quality as same as the uploaded one</p>
        </div>
        <div>
          <img src="free.png" alt="" />
          <p><span className="font-semibold text-2xl max-sm:text-xl">Fast and Free</span><br />download your reel at your fingertip. fast and easily thousand of times </p>
        </div>
        <div>
          <img src="login.png" alt="" />
          <p><span className="font-semibold text-2xl max-sm:text-xl">No Login Required</span><br /> you don't need to login to download the reel, hence feel free to use securely</p>
        </div>
      </div>
    </div>
  )
}

export default About
