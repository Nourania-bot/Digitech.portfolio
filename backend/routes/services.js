const router = require('express').Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// GET /api/services — public
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM services ORDER BY date_creation DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

// POST /api/services — admin seulement
router.post('/', auth, async (req, res) => {
  try {
    const { icon_service, titre_service, desc_service, tag_service } = req.body;
    if (!titre_service || !desc_service)
      return res.status(400).json({ message: 'Titre et description requis.' });

    const [result] = await db.query(
      'INSERT INTO services (icon_service, titre_service, desc_service, tag_service, id_admin) VALUES (?,?,?,?,?)',
      [icon_service || '💡', titre_service, desc_service, tag_service || '', req.admin.id]
    );
    const [newRow] = await db.query('SELECT * FROM services WHERE id_service = ?', [result.insertId]);
    res.status(201).json({ message: 'Service ajouté avec succès.', service: newRow[0] });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

// PUT /api/services/:id — admin seulement
router.put('/:id', auth, async (req, res) => {
  try {
    const { icon_service, titre_service, desc_service, tag_service } = req.body;
    await db.query(
      'UPDATE services SET icon_service=?, titre_service=?, desc_service=?, tag_service=? WHERE id_service=?',
      [icon_service, titre_service, desc_service, tag_service, req.params.id]
    );
    res.json({ message: 'Service mis à jour.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

// DELETE /api/services/:id — admin seulement
router.delete('/:id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM services WHERE id_service = ?', [req.params.id]);
    res.json({ message: 'Service supprimé.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

module.exports = router;
