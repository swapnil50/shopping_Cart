
import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '..', 'db', 'database.sqlite');

const router = express.Router();

let dbPromise = open({ filename: dbPath, driver: sqlite3.Database });

router.get('/', async (req, res) => {
  try {
    const db = await dbPromise;
    const rows = await db.all('SELECT * FROM products ORDER BY id');
    const mapped = rows.map(r => ({ ...r, image: '/images/' + r.image }));
    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const id = Number(req.params.id);
    const row = await db.get('SELECT * FROM products WHERE id = ?', id);
    if(!row) return res.status(404).json({ error: 'Not found' });
    row.image = '/images/' + row.image;
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
