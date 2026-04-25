const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email et mot de passe requis.' });

    const [rows] = await db.query('SELECT * FROM admins WHERE email_admin = ?', [email]);
    if (!rows.length)
      return res.status(401).json({ message: 'Identifiants incorrects.' });

    const admin = rows[0];
    const valid = await bcrypt.compare(password, admin.pwd_hash);
    if (!valid)
      return res.status(401).json({ message: 'Identifiants incorrects.' });

    const token = jwt.sign(
      { id: admin.id_admin, email: admin.email_admin },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    res.json({ token, admin: { id: admin.id_admin, email: admin.email_admin } });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

// GET /api/auth/me — vérifier le token
router.get('/me', require('../middleware/auth'), (req, res) => {
  res.json({ admin: req.admin });
});

module.exports = router;
