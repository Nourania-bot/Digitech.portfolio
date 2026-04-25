import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Portfolio.css';

const FALLBACK = [
  { id_project: 1, nom_project: 'DigoExpress', categorie: 'Web', desc_courte: 'Application de livraison rapide connectant clients et livreurs en temps réel.', desc_complete: 'DigoExpress est une plateforme complète de livraison à la demande. Elle connecte clients, commerçants et livreurs grâce à une interface moderne et une API performante avec géolocalisation en temps réel.', emoji_project: '🚀', tags_project: '["React","Node.js","MySQL","Socket.io"]' },
  { id_project: 2, nom_project: 'MadaPay',    categorie: 'Mobile', desc_courte: 'Solution de paiement mobile sécurisée pour les transactions quotidiennes.',     desc_complete: 'MadaPay simplifie les transactions financières à Madagascar. Compatible avec les opérateurs locaux, elle offre une sécurité renforcée et une interface intuitive pour tous les utilisateurs.', emoji_project: '💳', tags_project: '["React Native","Express","MySQL"]' },
  { id_project: 3, nom_project: 'EduTrack',   categorie: 'Web', desc_courte: 'Plateforme de gestion scolaire pour établissements primaires et secondaires.',   desc_complete: 'EduTrack permet aux établissements de gérer notes, absences, emplois du temps et communications parents via une interface web intuitive et un tableau de bord analytique.', emoji_project: '📚', tags_project: '["React","Laravel","MySQL"]' },
  { id_project: 4, nom_project: 'AgriBot',    categorie: 'IA', desc_courte: 'Assistant IA pour les agriculteurs malgaches basé sur les données météo.',       desc_complete: 'AgriBot aide les agriculteurs à optimiser leurs cultures via un chatbot intelligent analysant météo, type de sol et périodes de plantation spécifiques à Madagascar.', emoji_project: '🌱', tags_project: '["Python","TensorFlow","React","Node.js"]' },
];

const CATEGORIES = ['Tous', 'Web', 'Mobile', 'IA', 'Design'];

export default function Portfolio() {
  const [projects, setProjects] = useState(FALLBACK);
  const [filter, setFilter] = useState('Tous');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get('/api/projects')
      .then(r => { if (r.data.length) setProjects(r.data); })
      .catch(() => {});
  }, []);

  const filtered = filter === 'Tous' ? projects : projects.filter(p => p.categorie === filter);

  const parseTags = (tags) => {
    try { return Array.isArray(tags) ? tags : JSON.parse(tags || '[]'); }
    catch { return []; }
  };

  return (
    <section id="portfolio" className="portfolio section">
      <div className="container">
        <div className="portfolio__header">
          <p className="section-label">Ce que nous avons réalisé</p>
          <h2 className="section-title">Nos Réalisations</h2>
          <p className="section-subtitle">
            Découvrez quelques-uns de nos projets récents, du développement web à l'intelligence artificielle.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="portfolio__filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`portfolio__filter ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >{cat}</button>
          ))}
        </div>

        {/* Grid */}
        <div className="portfolio__grid">
          {filtered.map((p, i) => (
            <div
              className="project-card"
              key={p.id_project}
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => setSelected(p)}
            >
              <div className="project-card__emoji">{p.emoji_project}</div>
              <div className="project-card__body">
                <div className="project-card__meta">
                  <span className="tag">{p.categorie}</span>
                </div>
                <h3 className="project-card__title">{p.nom_project}</h3>
                <p className="project-card__desc">{p.desc_courte}</p>
                <div className="project-card__tags">
                  {parseTags(p.tags_project).map(t => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
                <button className="project-card__btn">
                  Voir plus
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box portfolio__modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            <div className="portfolio__modal-emoji">{selected.emoji_project}</div>
            <span className="tag">{selected.categorie}</span>
            <h2 className="portfolio__modal-title">{selected.nom_project}</h2>
            <p className="portfolio__modal-desc">{selected.desc_complete}</p>
            <div className="portfolio__modal-tags">
              {parseTags(selected.tags_project).map(t => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
