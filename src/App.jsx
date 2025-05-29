
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './layouts/navbar';
import Input from './layouts/input';
import InputStory from './layouts/inputstory';
import InputPost from './layouts/inputpost';
import InputPfp from './layouts/inputpfp';
import About from './layouts/about';
import Footer from './layouts/footer';


const App = () => (
  <Router>
    <Navbar />
    <br />
    
    <Routes>
      <Route path="/" element={<Input />} />
      <Route path="/inputstory" element={<InputStory />} />
      <Route path="/inputpost" element={<InputPost />} />
      <Route path="/inputpfp" element={<InputPfp />} />
    </Routes>
    <br />
    <br />
    <p className='text-center text-[#567c8d] '> also try </p>
    <nav className='flex gap-0 text-center justify-center'>
      <Link to="/" className='text-[#2f4156] px-3 border-l-2  border-[#567c8d] hover:underline'>reel</Link>
      <Link to="/inputstory" className='text-[#2f4156] px-3 border-l-2 border-[#567c8d] hover:underline'>story</Link>
      <Link to="/inputpost" className='text-[#2f4156] px-3 border-l-2 border-[#567c8d] hover:underline'>post</Link>
      <Link to="/inputpfp" className='text-[#2f4156] px-3 border-l-2 border-r-2 border-[#567c8d] hover:underline'>profile pic</Link>
    </nav>
    <br />
    <hr />
    
    <section id='about' className='mt-14 mb-10'>
      <About />
    </section>

    <section id='contact'>
      <Footer />
    </section>
  </Router>
);

export default App