import React from 'react';
import './About.css';

const stats = [
  { number: '50+', label: 'Projets livrés' },
  { number: '30+', label: 'Clients satisfaits' },
  { number: '5+',  label: 'Années d\'expérience' },
  { number: '24/7', label: 'Support disponible' },
];

const values = [
  { icon: '🎯', title: 'Excellence', desc: 'Chaque ligne de code est pensée pour la performance et la durabilité.' },
  { icon: '🤝', title: 'Proximité', desc: 'Nous accompagnons chaque client de l\'idée jusqu\'au déploiement.' },
  { icon: '🔒', title: 'Fiabilité', desc: 'Des solutions sécurisées et robustes sur lesquelles vous pouvez compter.' },
  { icon: '⚡', title: 'Agilité', desc: 'Nous nous adaptons rapidement à vos besoins et aux évolutions du marché.' },
];

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">

        {/* Top: image + text */}
        <div className="about__top">
          <div className="about__images">
            <img src="/images/acceuil.jpg" alt="Equipe Digitech" className="about__img-main" />
            <img src="/images/site.jpg"    alt="Projets Digitech"  className="about__img-secondary" />
            <div className="about__img-badge">
              <span className="about__img-badge-icon">💡</span>
              <div>
                <strong>Innovation</strong>
                <p>Solutions sur mesure</p>
              </div>
            </div>
          </div>

          <div className="about__text">
            <p className="section-label">À propos de nous</p>
            <h2 className="section-title">
              Digitech, votre partenaire digital à Madagascar
            </h2>
            <p className="about__desc">
              Digitech Madagascar est une entreprise de services numériques fondée par des
              passionnés de technologie basés à Antsiranana. Notre mission : transformer vos
              idées en solutions digitales fiables, performantes et adaptées au marché malgache
              et international.
            </p>
            <p className="about__desc">
              Nous intervenons sur l'ensemble du cycle de vie de vos projets — de la conception
              UX/UI au déploiement en production — avec une approche agile et centrée sur vos
              objectifs métiers.
            </p>
            <div className="about__values">
              {values.map(v => (
                <div className="about__value" key={v.title}>
                  <span className="about__value-icon">{v.icon}</span>
                  <div>
                    <strong>{v.title}</strong>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="btn-primary"
              onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Travaillons ensemble
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="about__stats">
          {stats.map(s => (
            <div className="about__stat" key={s.label}>
              <strong>{s.number}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
