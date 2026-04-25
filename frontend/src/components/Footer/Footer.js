import React from 'react';
import './Footer.css';

const links = [
  { label: 'Accueil',      href: '#home' },
  { label: 'À propos',     href: '#about' },
  { label: 'Services',     href: '#services' },
  { label: 'Réalisations', href: '#portfolio' },
  { label: 'Contact',      href: '#contact' },
];

export default function Footer() {
  const scroll = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">

          <div className="footer__brand">
            <div className="footer__logo">
              <img src="/images/logo.png" alt="Digitech Logo" />
              <span>Digitech</span>
            </div>
            <p>Votre partenaire digital à Madagascar. Solutions web, mobile, IA et SaaS sur mesure.</p>
            <p className="footer__address">📍 5.012.02 Rue de la Fayette Diego Suarez, Antsiranana</p>
          </div>

          <div className="footer__nav">
            <h4>Navigation</h4>
            <ul>
              {links.map(l => (
                <li key={l.href}>
                  <button onClick={() => scroll(l.href)}>{l.label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__contact">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:digitechservice02@gmail.com">✉️ digitechservice02@gmail.com</a></li>
              <li><a href="tel:+261322828006">📞 +261 32 28 28 006</a></li>
              <li><span>🕐 Lun–Ven : 08h00–17h00</span></li>
            </ul>
          </div>

          <div className="footer__services">
            <h4>Services</h4>
            <ul>
              {['Développement Web', 'Application Mobile', 'UI/UX Design', 'Intelligence Artificielle', 'E-Commerce', 'Cloud & DevOps'].map(s => (
                <li key={s}><button onClick={() => scroll('#services')}>{s}</button></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Digitech Madagascar. Tous droits réservés.</p>
          <p>Conçu et développé par <strong>Digitech Madagascar</strong></p>
        </div>
      </div>
    </footer>
  );
}
