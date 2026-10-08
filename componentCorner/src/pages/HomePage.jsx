import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import './Pages.css';

function HomePage() {
  return (
    <>
      <Hero
        title="Better tools for your everyday rituals."
        subtitle="A considered collection of clever tech, desk essentials, and little upgrades that make a difference."
        callToAction="Shop the collection"
      />
      <section className="home-intro" aria-labelledby="home-intro-heading">
        <p className="eyebrow">Why shop with us?</p>
        <h2 id="home-intro-heading">Useful things, chosen with care.</h2>
        <p>We look for thoughtful design, dependable materials, and everyday details that make work and home feel a little better.</p>
        <Link className="text-link" to="/products">Browse all products <span aria-hidden="true">→</span></Link>
      </section>
    </>
  );
}

export default HomePage;