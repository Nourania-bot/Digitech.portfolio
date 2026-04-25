import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const INITIAL = { nom_contact: '', email_contact: '', sujet_contact: '', msg_contact: '' };

export default function Contact() {
  const [form, setForm]     = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast]   = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const validate = () => {
    const e = {};
    if (!form.nom_contact.trim())     e.nom_contact     = 'Le nom est requis.';
    if (!form.email_contact.trim())   e.email_contact   = 'L\'email est requis.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email_contact))
                                      e.email_contact   = 'Email invalide.';
    if (!form.sujet_contact.trim())   e.sujet_contact   = 'Le sujet est requis.';
    if (!form.msg_contact.trim())     e.msg_contact     = 'Le message est requis.';
    else if (form.msg_contact.trim().length < 20)
                                      e.msg_contact     = 'Minimum 20 caractères.';
    return e;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await axios.post('/api/contacts', form);
      showToast('✅ Message envoyé avec succès ! Nous vous répondrons très bientôt.');
      setForm(INITIAL); setErrors({});
    } catch (err) {
      showToast('❌ ' + (err.response?.data?.message || 'Une erreur est survenue.'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const infos = [
    { icon: '📍', label: 'Adresse',  value: '5.012.02 Rue de la Fayette Diego Suarez, Antsiranana, Madagascar' },
    { icon: '✉️', label: 'Email',    value: 'digitechservice02@gmail.com', href: 'mailto:digitechservice02@gmail.com' },
    { icon: '📞', label: 'Téléphone', value: '+261 32 28 28 006',           href: 'tel:+261322828006' },
  ];

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="contact__grid">

          {/* Left — info */}
          <div className="contact__info">
            <p className="section-label">Parlons de votre projet</p>
            <h2 className="section-title">Contactez-nous</h2>
            <p className="contact__intro">
              Vous avez un projet en tête ? Une question ? Remplissez le formulaire et notre équipe
              vous répondra dans les 24 heures ouvrables.
            </p>

            <div className="contact__details">
              {infos.map(i => (
                <div className="contact__detail" key={i.label}>
                  <span className="contact__detail-icon">{i.icon}</span>
                  <div>
                    <strong>{i.label}</strong>
                    {i.href
                      ? <a href={i.href}>{i.value}</a>
                      : <p>{i.value}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact__social">
              <a href="mailto:digitechservice02@gmail.com" className="contact__social-btn" aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
              </a>
              <a href="tel:+261322828006" className="contact__social-btn" aria-label="Téléphone">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="contact__form-wrap">
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <div className="contact__form-row">
                <div className="form-group">
                  <label>Nom complet *</label>
                  <input
                    name="nom_contact" value={form.nom_contact}
                    onChange={handleChange} placeholder="Jean Dupont"
                    className={errors.nom_contact ? 'error' : ''}
                  />
                  {errors.nom_contact && <p className="error-msg">{errors.nom_contact}</p>}
                </div>
                <div className="form-group">
                  <label>Adresse email *</label>
                  <input
                    type="email" name="email_contact" value={form.email_contact}
                    onChange={handleChange} placeholder="jean@example.com"
                    className={errors.email_contact ? 'error' : ''}
                  />
                  {errors.email_contact && <p className="error-msg">{errors.email_contact}</p>}
                </div>
              </div>
              <div className="form-group">
                <label>Sujet *</label>
                <input
                  name="sujet_contact" value={form.sujet_contact}
                  onChange={handleChange} placeholder="Développement d'une application web..."
                  className={errors.sujet_contact ? 'error' : ''}
                />
                {errors.sujet_contact && <p className="error-msg">{errors.sujet_contact}</p>}
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="msg_contact" value={form.msg_contact} rows={6}
                  onChange={handleChange} placeholder="Décrivez votre projet en détail..."
                  className={errors.msg_contact ? 'error' : ''}
                />
                {errors.msg_contact && <p className="error-msg">{errors.msg_contact}</p>}
              </div>
              <button type="submit" className="btn-primary contact__submit" disabled={loading}>
                {loading ? (
                  <><span className="spinner"/> Envoi en cours...</>
                ) : (
                  <>Envoyer le message
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </section>
  );
}
