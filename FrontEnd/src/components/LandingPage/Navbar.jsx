import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const scrollToSection = (e, id) => {
    if (isHome) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <div className="logo">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="logo-icon"></div>
            <span>SwarAI</span>
          </Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/" onClick={(e) => scrollToSection(e, 'home')}>Home</Link></li>
          <li><a href="/#about" onClick={(e) => scrollToSection(e, 'about')}>About Us</a></li>
          <li><a href="/#features" onClick={(e) => scrollToSection(e, 'features')}>Features</a></li>
          <li><a href="/#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')}>Testimonials</a></li>
        </ul>
        <Link to="/editor" className="btn btn-primary">Get Started</Link>
      </div>
    </nav>
  );
};

export default Navbar;
