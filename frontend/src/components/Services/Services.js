import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Services.css';

const FALLBACK = [
  { id_service: 1, icon_service: '💻', titre_service: 'Développement Web',      tag_service: 'React / Node.js / Laravel', desc_service: 'Création de sites et applications web modernes, responsive et performants.' },
  { id_service: 2, icon_service: '📱', titre_service: 'Application Mobile',     tag_service: 'React Native / Flutter',    desc_service: 'Applications iOS et Android avec une expérience utilisateur optimale.' },
  { id_service: 3, icon_service: '🎨', titre_service: 'UI/UX Design',           tag_service: 'Figma / Adobe XD',          desc_service: 'Interfaces intuitives et esthétiques pour une expérience exceptionnelle.' },
  { id_service: 4, icon_service: '🤖', titre_service: 'Intelligence Artificielle', tag_service: 'Python / TensorFlow',    desc_service: 'Intégration de solutions IA pour automatiser vos processus métiers.' },
  { id_service: 5, icon_service: '🛒', titre_service: 'E-Commerce',             tag_service: 'WooCommerce / Stripe',      desc_service: 'Boutiques en ligne performantes avec gestion des paiements et stocks.' },
  { id_service: 6, icon_service: '☁️', titre_service: 'Cloud & DevOps',         tag_service: 'AWS / Docker',              desc_service: 'Déploiement et gestion cloud avec pipelines CI/CD robustes.' },
];

export default function Services() {
  const [services, setServices] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/services')
      .then(r => { if (r.data.length) setServices(r.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="services" className="services section">
      <div className="container">
        <div className="services__header">
          <p className="section-label">Ce que nous faisons</p>
          <h2 className="section-title">Nos Services</h2>
          <p className="section-subtitle">
            Des solutions digitales complètes et adaptées à vos besoins, conçues par des experts
            passionnés pour propulser votre activité.
          </p>
        </div>

        {loading ? (
          <div className="services__skeleton">
            {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton-card" />)}
          </div>
        ) : (
          <div className="services__grid">
            {services.map((s, i) => (
              <div className="service-card" key={s.id_service} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="service-card__icon">{s.icon_service}</div>
                <h3 className="service-card__title">{s.titre_service}</h3>
                <p className="service-card__desc">{s.desc_service}</p>
                <div className="service-card__tags">
                  {(s.tag_service || '').split('/').map(t => t.trim()).filter(Boolean).map(t => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
                <div className="service-card__arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
