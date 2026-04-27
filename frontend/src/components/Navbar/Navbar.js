import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar({ onAdminClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil',      href: '#home' },
    { label: 'À propos',     href: '#about' },
    { label: 'Services',     href: '#services' },
    { label: 'Réalisations', href: '#portfolio' },
    { label: 'Contact',      href: '#contact' },
  ];

  const handleNav = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container container">
        {/* Logo */}
        <a className="navbar__brand" href="#home" onClick={() => handleNav('#home')} onDoubleClick={onAdminClick}>          
        <img src="/images/logo.png" alt="Digitech Logo" className="navbar__logo" />
          <span className="navbar__name">Digitech</span>
        </a>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {navLinks.map(l => (
            <li key={l.href}>
              <button className="navbar__link" onClick={() => handleNav(l.href)}>{l.label}</button>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="navbar__actions">
          {isAdmin ? (
            <>
              <button className="btn-outline btn-sm" onClick={onAdminClick}>
                ⚙ Espace Admin
              </button>
              <button className="btn-logout" onClick={logout} title="Se déconnecter">✕</button>
            </>
          ) : (
            <button className="btn-primary btn-sm" onClick={() => handleNav('#contact')}>
              Contactez-nous
            </button>
          )}

          {/* Burger */}
          <button
            className={`navbar__burger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span/><span/><span/>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(l => (
          <button key={l.href} className="navbar__mobile-link" onClick={() => handleNav(l.href)}>
            {l.label}
          </button>
        ))}
        {isAdmin && (
          <button className="navbar__mobile-link admin-link" onClick={() => { setMenuOpen(false); onAdminClick(); }}>
            ⚙ Espace Admin
          </button>
        )}
        <button className="btn-primary" style={{ margin: '12px 16px' }} onClick={() => handleNav('#contact')}>
          Contactez-nous
        </button>
      </div>
    </nav>
  );
}
