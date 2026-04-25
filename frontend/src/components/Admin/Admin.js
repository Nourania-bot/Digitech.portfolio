import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

export default function AdminModal({ onClose }) {
  const { admin, login, isAdmin } = useAuth();
  const [tab, setTab]           = useState('services'); // services | projects | contacts
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginErr, setLoginErr]  = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Data
  const [services,  setServices]  = useState([]);
  const [projects,  setProjects]  = useState([]);
  const [contacts,  setContacts]  = useState([]);
  const [toast, setToast]         = useState(null);

  // Form states
  const [svcForm, setSvcForm] = useState({ icon_service: '💡', titre_service: '', desc_service: '', tag_service: '' });
  const [prjForm, setPrjForm] = useState({ categorie: 'Web', nom_project: '', desc_courte: '', desc_complete: '', emoji_project: '🚀', tags_project: '' });

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchAll();
    }
  }, [isAdmin]);

  const fetchAll = async () => {
    try {
      const [s, p, c] = await Promise.all([
        axios.get('/api/services'),
        axios.get('/api/projects'),
        axios.get('/api/contacts'),
      ]);
      setServices(s.data);
      setProjects(p.data);
      setContacts(c.data);
    } catch {}
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginErr('');
    setLoginLoading(true);
    try {
      await login(loginForm.email, loginForm.password);
    } catch (err) {
      setLoginErr(err.response?.data?.message || 'Identifiants incorrects.');
    } finally {
      setLoginLoading(false);
    }
  };

  // ADD SERVICE
  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/services', svcForm);
      showToast('✅ Service publié avec succès !');
      setSvcForm({ icon_service: '💡', titre_service: '', desc_service: '', tag_service: '' });
      fetchAll();
    } catch (err) {
      showToast('❌ ' + (err.response?.data?.message || 'Erreur'), 'error');
    }
  };

  // ADD PROJECT
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const tags = prjForm.tags_project.split(',').map(t => t.trim()).filter(Boolean);
      await axios.post('/api/projects', { ...prjForm, tags_project: tags });
      showToast('✅ Projet publié avec succès !');
      setPrjForm({ categorie: 'Web', nom_project: '', desc_courte: '', desc_complete: '', emoji_project: '🚀', tags_project: '' });
      fetchAll();
    } catch (err) {
      showToast('❌ ' + (err.response?.data?.message || 'Erreur'), 'error');
    }
  };

  // DELETE
  const deleteService = async (id) => {
    if (!window.confirm('Supprimer ce service ?')) return;
    try { await axios.delete(`/api/services/${id}`); fetchAll(); showToast('Service supprimé.'); }
    catch { showToast('Erreur lors de la suppression.', 'error'); }
  };
  const deleteProject = async (id) => {
    if (!window.confirm('Supprimer ce projet ?')) return;
    try { await axios.delete(`/api/projects/${id}`); fetchAll(); showToast('Projet supprimé.'); }
    catch { showToast('Erreur lors de la suppression.', 'error'); }
  };
  const markRead = async (id) => {
    try { await axios.patch(`/api/contacts/${id}/lu`); fetchAll(); }
    catch {}
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box admin-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {!isAdmin ? (
          /* ── LOGIN FORM ── */
          <div className="admin-login">
            <div className="admin-login__icon">🔐</div>
            <h2>Espace Administrateur</h2>
            <p>Connectez-vous pour gérer le contenu du site.</p>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email" placeholder="admin@digitech.mg"
                  value={loginForm.email}
                  onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mot de passe</label>
                <input
                  type="password" placeholder="••••••••"
                  value={loginForm.password}
                  onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                  required
                />
              </div>
              {loginErr && <p className="admin-login__err">{loginErr}</p>}
              <button type="submit" className="btn-primary admin-login__btn" disabled={loginLoading}>
                {loginLoading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
          </div>
        ) : (
          /* ── DASHBOARD ── */
          <div className="admin-dash">
            <div className="admin-dash__header">
              <div>
                <h2>Tableau de bord</h2>
                <p>Bienvenue, <strong>{admin?.email}</strong></p>
              </div>
              <div className="admin-dash__stats">
                <span>{services.length} services</span>
                <span>{projects.length} projets</span>
                <span>{contacts.filter(c => !c.lu_contact).length} non lus</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="admin-tabs">
              {[['services','🛠 Services'],['projects','📁 Projets'],['contacts','✉️ Messages']].map(([id, lbl]) => (
                <button key={id} className={`admin-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
                  {lbl}
                </button>
              ))}
            </div>

            <div className="admin-content">
              {/* ── SERVICES TAB ── */}
              {tab === 'services' && (
                <div>
                  <form className="admin-form" onSubmit={handleAddService}>
                    <h3>Ajouter un service</h3>
                    <div className="admin-form__row">
                      <div className="form-group">
                        <label>Icône</label>
                        <input value={svcForm.icon_service} onChange={e => setSvcForm(f => ({...f, icon_service: e.target.value}))} placeholder="💡" />
                      </div>
                      <div className="form-group" style={{flex:3}}>
                        <label>Titre *</label>
                        <input value={svcForm.titre_service} onChange={e => setSvcForm(f => ({...f, titre_service: e.target.value}))} placeholder="Titre du service" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description *</label>
                      <textarea rows={3} value={svcForm.desc_service} onChange={e => setSvcForm(f => ({...f, desc_service: e.target.value}))} placeholder="Description du service..." required />
                    </div>
                    <div className="form-group">
                      <label>Technologies (séparées par /)</label>
                      <input value={svcForm.tag_service} onChange={e => setSvcForm(f => ({...f, tag_service: e.target.value}))} placeholder="React / Node.js / MySQL" />
                    </div>
                    <button type="submit" className="btn-primary">Publier le service</button>
                  </form>

                  <div className="admin-list">
                    <h3>Services publiés ({services.length})</h3>
                    {services.map(s => (
                      <div className="admin-list__item" key={s.id_service}>
                        <span className="admin-list__icon">{s.icon_service}</span>
                        <div className="admin-list__info">
                          <strong>{s.titre_service}</strong>
                          <p>{s.tag_service}</p>
                        </div>
                        <button className="admin-list__delete" onClick={() => deleteService(s.id_service)}>🗑</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── PROJECTS TAB ── */}
              {tab === 'projects' && (
                <div>
                  <form className="admin-form" onSubmit={handleAddProject}>
                    <h3>Ajouter un projet</h3>
                    <div className="admin-form__row">
                      <div className="form-group">
                        <label>Emoji</label>
                        <input value={prjForm.emoji_project} onChange={e => setPrjForm(f => ({...f, emoji_project: e.target.value}))} placeholder="🚀" />
                      </div>
                      <div className="form-group">
                        <label>Catégorie</label>
                        <select value={prjForm.categorie} onChange={e => setPrjForm(f => ({...f, categorie: e.target.value}))}>
                          {['Web','Mobile','IA','Design','E-Commerce'].map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="form-group" style={{flex:3}}>
                        <label>Nom du projet *</label>
                        <input value={prjForm.nom_project} onChange={e => setPrjForm(f => ({...f, nom_project: e.target.value}))} placeholder="Nom du projet" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description courte *</label>
                      <input value={prjForm.desc_courte} onChange={e => setPrjForm(f => ({...f, desc_courte: e.target.value}))} placeholder="Résumé en une ligne..." required />
                    </div>
                    <div className="form-group">
                      <label>Description complète *</label>
                      <textarea rows={3} value={prjForm.desc_complete} onChange={e => setPrjForm(f => ({...f, desc_complete: e.target.value}))} placeholder="Description détaillée..." required />
                    </div>
                    <div className="form-group">
                      <label>Technologies (séparées par virgules)</label>
                      <input value={prjForm.tags_project} onChange={e => setPrjForm(f => ({...f, tags_project: e.target.value}))} placeholder="React, Node.js, MySQL" />
                    </div>
                    <button type="submit" className="btn-primary">Publier le projet</button>
                  </form>

                  <div className="admin-list">
                    <h3>Projets publiés ({projects.length})</h3>
                    {projects.map(p => (
                      <div className="admin-list__item" key={p.id_project}>
                        <span className="admin-list__icon">{p.emoji_project}</span>
                        <div className="admin-list__info">
                          <strong>{p.nom_project}</strong>
                          <p>{p.categorie} • {p.desc_courte?.slice(0, 60)}...</p>
                        </div>
                        <button className="admin-list__delete" onClick={() => deleteProject(p.id_project)}>🗑</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── CONTACTS TAB ── */}
              {tab === 'contacts' && (
                <div className="admin-list">
                  <h3>Messages reçus ({contacts.length})</h3>
                  {contacts.length === 0 && <p className="admin-empty">Aucun message pour l'instant.</p>}
                  {contacts.map(c => (
                    <div className={`admin-list__item contact-item ${!c.lu_contact ? 'unread' : ''}`} key={c.id_contact}>
                      <div className="admin-list__info">
                        <div className="contact-item__head">
                          <strong>{c.nom_contact}</strong>
                          <span>{c.email_contact}</span>
                          {!c.lu_contact && <span className="contact-item__badge">Nouveau</span>}
                        </div>
                        <p className="contact-item__subject">📌 {c.sujet_contact}</p>
                        <p className="contact-item__msg">{c.msg_contact}</p>
                        <p className="contact-item__date">{new Date(c.date_envoi).toLocaleString('fr-FR')}</p>
                      </div>
                      {!c.lu_contact && (
                        <button className="admin-list__read" onClick={() => markRead(c.id_contact)}>✓ Lu</button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
      </div>
    </div>
  );
}
