import Navbar from './layouts/navbar';
import Input from './layouts/input';
import About from './layouts/about';
import Footer from './layouts/footer';


const App = () => (
  <main>
      <Navbar />

    <section className="mt-20">
      <Input />
    </section>
      <hr />
    <section id='about' className='mt-14 mb-10'>
      <About />
    </section>

    <section id='contact'>
      <Footer />
    </section>
  </main>
);

export default App