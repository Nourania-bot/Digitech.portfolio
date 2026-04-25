import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/images/logo.png';
import './Navbar.css';

const Navbar = ({ onAdminClick }) => {
  const { admin } = useAuth();
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeSection, setActive]   = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { id: 'home',      label: 'Accueil' },
    { id: 'about',     label: 'À propos' },
    { id: 'services',  label: 'Services' },
    { id: 'portfolio', label: 'Réalisations' },
    { id: 'contact',   label: 'Contact' },
  ];

  const scrollTo = (id) => {
    setMenuOpen(false);
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <div className="navbar__logo" onClick={() => scrollTo('home')}>
          <img src={logo} alt="Digitech Madagascar" />
          <span>Digitech</span>
        </div>

        {/* Desktop links */}
        <ul className="navbar__links">
          {navLinks.map(l => (
            <li key={l.id}>
              <button
                className={`navbar__link ${activeSection === l.id ? 'active' : ''}`}
                onClick={() => scrollTo(l.id)}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA + burger */}
        <div className="navbar__actions">
          {admin ? (
            <button className="btn-admin" onClick={onAdminClick}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1"/></svg>
              Espace Admin
            </button>
          ) : (
            <button className="btn-primary" onClick={() => scrollTo('contact')}>
              Nous contacter
            </button>
          )}
          <button
            className={`navbar__burger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(l => (
          <button key={l.id} className="navbar__mobile-link" onClick={() => scrollTo(l.id)}>
            {l.label}
          </button>
        ))}
        {admin && (
          <button className="btn-admin" onClick={() => { setMenuOpen(false); onAdminClick(); }}>
            Espace Admin
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
