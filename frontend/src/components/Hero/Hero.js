import React, { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const text = el.dataset.text;
    let i = 0;
    el.textContent = '';
    const interval = setInterval(() => {
      if (i < text.length) { el.textContent += text[i++]; }
      else clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero">
      {/* Background image */}
      <div className="hero__bg">
        <img src="/images/hero.jpg" alt="Hero background" />
        <div className="hero__overlay" />
      </div>

      <div className="container hero__content">
        <div className="hero__left">
          <span className="hero__badge">🚀 ESN à Madagascar</span>
          <h1 className="hero__title">
            <span
              ref={titleRef}
              data-text="L'expertise digitale au service de votre réussite"
            />
            <span className="hero__cursor">|</span>
          </h1>
          <p className="hero__desc">
            Digitech Madagascar conçoit des solutions digitales sur mesure — applications web,
            mobiles, IA et SaaS — pour les entreprises, organisations et particuliers d'ici et d'ailleurs.
          </p>
          <div className="hero__actions">
            <button className="btn-primary" onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}>
              Démarrer un projet
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button className="btn-hero-outline" onClick={() => document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth' })}>
              Voir nos réalisations
            </button>
          </div>
          <div className="hero__stats">
            {[['50+', 'Projets livrés'], ['100%', 'Satisfaction client'], ['24/7', 'Support actif']].map(([n, l]) => (
              <div className="hero__stat" key={n}>
                <strong>{n}</strong><span>{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__right">
          <div className="hero__card">
            <img src="/images/acceuil.jpg" alt="Equipe Digitech" className="hero__card-img" />
            <div className="hero__card-info">
              <div className="hero__card-dot" />
              <div>
                <p className="hero__card-label">Basé à Antsiranana</p>
                <p className="hero__card-sub">Diego Suarez, Madagascar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <div className="hero__scroll-dot" />
      </div>
    </section>
  );
}
