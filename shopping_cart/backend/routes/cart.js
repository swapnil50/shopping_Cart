
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
    const items = await db.all(`SELECT c.id as cart_id, p.id as product_id, p.name, p.price, p.image, c.quantity
      FROM cart c JOIN products p ON c.product_id = p.id`);
    const mapped = items.map(i => ({ ...i, image: '/images/' + i.image }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    if(!product_id || !quantity) return res.status(400).json({ error: 'Missing data' });
    const db = await dbPromise;
    const existing = await db.get('SELECT * FROM cart WHERE product_id = ?', product_id);
    if(existing){
      await db.run('UPDATE cart SET quantity = ? WHERE product_id = ?', quantity, product_id);
    } else {
      await db.run('INSERT INTO cart (product_id, quantity) VALUES (?, ?)', product_id, quantity);
    }
    const items = await db.all(`SELECT c.id as cart_id, p.id as product_id, p.name, p.price, p.image, c.quantity
      FROM cart c JOIN products p ON c.product_id = p.id`);
    const mapped = items.map(i => ({ ...i, image: '/images/' + i.image }));
    res.json({ success: true, items: mapped });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:cart_id', async (req, res) => {
  try {
    const cart_id = Number(req.params.cart_id);
    const db = await dbPromise;
    await db.run('DELETE FROM cart WHERE id = ?', cart_id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/', async (req, res) => {
  try {
    const db = await dbPromise;
    await db.run('DELETE FROM cart');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
