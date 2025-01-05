

const Footer = () => {
  return (
    <footer className="bg-[#2f4156]">
      <div className="flex justify-between max-sm:flex-col max-sm:justify-center">
        <div className="m-10 ">
          <p className=" text-[22px] font-semibold max-sm:text-left ">GET<span className="text-white font-normal">insta</span> <br /> <hr />
          <span className="text-[15px] font-medium max-sm:text-[13px] "> "Your go-to tool for downloading Instagram reels instantly !"</span></p>
          <div id="social" className="text-black flex flex-col mt-3 ">
            <a href="">privacy policy</a>
            <a href="">terms of service</a>
            <div  className="flex flex-row justify-start mt-2 ">
              <a href="">email</a>
              <a href="">linkedin</a>
              <a href="">github</a>
            </div>
          </div>
        </div>
        <span className="m-20 text-center max-sm:m-8 ">made with &#10084; by an <br /> instagram user & engineer </span>
        <div className="m-8">
          <p className="m-1 text-[18px] font-medium text-white max-sm:text-[15px] max-sm:text-center ">contact us for any query ! </p>
          <form id="contact" action="">
            <input type="email" placeholder="your@email.com" 
            className="m-1 w-96 rounded-[8px] text-[15px] px-3 py-0.5 bg-slate-300 max-sm:text-[12px] "/> 
            <br />
            <textarea name="" id="" placeholder="write your message" fixed 
            className="m-1 h-24 w-96 rounded-[8px] px-3 py-0.5 text-[15px] border-2 bg-slate-300 max-sm:text-[12px] "></textarea> <br />
            <button type="submit"
            className="border-2 text-[15px] rounded-[10px] ml-2 px-2.5 py-0.5 text-white max-sm:text-[13px] font-medium hover:bg-[#ccc] hover:text-black hover:border-black "> submit</button>
          </form>
        </div>
      </div>
      <div className="w-100 font-light text-center mb-0 bg-black p-1 text-white max-sm:text-[12px] ">
         GETinsta &copy;2025. All rights reserved
      </div>
    </footer>
  )
}

export default Footer
