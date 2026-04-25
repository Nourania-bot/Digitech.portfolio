const router = require('express').Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// GET /api/projects — public
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM projects ORDER BY date_creation DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

// POST /api/projects — admin seulement
router.post('/', auth, async (req, res) => {
  try {
    const { categorie, nom_project, desc_courte, desc_complete, emoji_project, tags_project } = req.body;
    if (!nom_project || !desc_courte || !desc_complete)
      return res.status(400).json({ message: 'Nom, description courte et complète requis.' });

    const tagsJson = Array.isArray(tags_project)
      ? JSON.stringify(tags_project)
      : tags_project || '[]';

    const [result] = await db.query(
      'INSERT INTO projects (categorie, nom_project, desc_courte, desc_complete, emoji_project, tags_project, id_admin) VALUES (?,?,?,?,?,?,?)',
      [categorie || 'Web', nom_project, desc_courte, desc_complete, emoji_project || '🚀', tagsJson, req.admin.id]
    );
    const [newRow] = await db.query('SELECT * FROM projects WHERE id_project = ?', [result.insertId]);
    res.status(201).json({ message: 'Projet ajouté avec succès.', project: newRow[0] });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

// DELETE /api/projects/:id — admin seulement
router.delete('/:id', auth, async (req, res) => {
  try {
    await db.query('DELETE FROM projects WHERE id_project = ?', [req.params.id]);
    res.json({ message: 'Projet supprimé.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

module.exports = router;
