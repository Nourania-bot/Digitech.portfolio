const router = require('express').Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// POST /api/contacts — public (formulaire visiteur)
router.post('/', async (req, res) => {
  try {
    const { nom_contact, email_contact, sujet_contact, msg_contact } = req.body;
    if (!nom_contact || !email_contact || !sujet_contact || !msg_contact)
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_contact))
      return res.status(400).json({ message: 'Adresse email invalide.' });

    await db.query(
      'INSERT INTO contacts (nom_contact, email_contact, sujet_contact, msg_contact) VALUES (?,?,?,?)',
      [nom_contact, email_contact, sujet_contact, msg_contact]
    );
    res.status(201).json({ message: 'Message envoyé avec succès. Nous vous répondrons bientôt !' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

// GET /api/contacts — admin seulement
router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM contacts ORDER BY date_envoi DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

// PATCH /api/contacts/:id/lu — marquer comme lu
router.patch('/:id/lu', auth, async (req, res) => {
  try {
    await db.query('UPDATE contacts SET lu_contact = 1 WHERE id_contact = ?', [req.params.id]);
    res.json({ message: 'Message marqué comme lu.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

module.exports = router;
