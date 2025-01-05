

const Navbar = () => {
  return (
    <div className="w-100 flex justify-between bg-[#567c8d] max-sm:h-fit ">
      <div id="logo" className="flex m-0.5">
        <img src="getinsta.png" alt="lo" className="m-1 w-12 ml-3 max-sm:ml-0.5 max-sm:m-0 "/>
        <h1 className="text-[25px]  text-white font-normal max-sm:text-[20px] max-sm:mt-0.5"><b className='font-bold text-[#2f4156]'>GET</b>insta</h1>
      </div>
      <nav>
        <ul className="flex text-[19px]">
          <li><a href="">Home</a></li>
          <li><a href="">Contact</a></li>
          <li className='pr-5'><a href="">About</a></li>
        </ul>

      </nav>
    </div>
  )
}

export default Navbar
