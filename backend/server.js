const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/services',  require('./routes/services'));
app.use('/api/projects',  require('./routes/projects'));
app.use('/api/contacts',  require('./routes/contacts'));
app.use('/api/auth',      require('./routes/auth'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'Digitech API running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Digitech API démarrée sur le port ${PORT}`));
