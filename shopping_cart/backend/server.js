
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import productsRouter from './routes/products.js';
import cartRouter from './routes/cart.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);

app.get('/', (req, res) => res.send("Swapnil's Ecom API running. Try /api/products"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
