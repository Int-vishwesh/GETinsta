import Navbar from './layouts/navbar';
import Input from './layouts/input';
import Content from './layouts/content';
import About from './layouts/about';
import Footer from './layouts/footer';
import Example from './layouts/example';

const App = () => (
  <main>
      <Navbar />

    <section className="mt-20">
      <Input />
    </section>

    <section>
      <Content/>
    </section>

    <section className='mt-14 mb-10'>
      <About />
    </section>

    <section>
      <Example />
    </section>

    <section>
      <Footer />
    </section>
  </main>
);

export default App