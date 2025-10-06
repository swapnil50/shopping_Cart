
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';

const API = import.meta.env.VITE_API || 'http://localhost:4000/api';

export default function App(){
  const [products, setProducts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(()=>{ fetchProducts(); fetchCart(); },[]);

  async function fetchProducts(){
    try{
      const res = await axios.get(API + '/products');
      setProducts(res.data);
    }catch(e){ console.error(e); }
  }

  async function fetchCart(){
    try{
      const res = await axios.get(API + '/cart');
      setCartItems(res.data);
    }catch(e){ console.error(e); }
  }

  async function addToCart(product){
    try{
      const existing = cartItems.find(i=>i.product_id===product.id);
      const qty = existing ? existing.quantity + 1 : 1;
      await axios.post(API + '/cart', { product_id: product.id, quantity: qty });
      fetchCart();
      setCartOpen(true);
    }catch(e){ console.error(e); }
  }

  async function removeCart(cart_id){
    try{
      await axios.delete(API + '/cart/' + cart_id);
      fetchCart();
    }catch(e){ console.error(e); }
  }

  async function clearCart(){
    try{
      await axios.delete(API + '/cart');
      fetchCart();
    }catch(e){ console.error(e); }
  }

  const total = cartItems.reduce((s,i)=> s + i.price * i.quantity, 0);

  return (
    <div>
      <Navbar cartCount={cartItems.length} onCart={()=>setCartOpen(true)} />
      <main className="container">
        <section className="hero">
          <div className="hero-left">
            <h1>Swapnil's Ecom</h1>
            <p>Fashion & style — handpicked for you</p>
          </div>
          <div className="carousel">
            <button className="arrow left" aria-label="prev">‹</button>
            <div className="carousel-track">
              {products.slice(0,5).map(p=> (
                <div className="carousel-item" key={p.id}>
                  <img src={'http://localhost:4000' + p.image} alt={p.name} />
                </div>
              ))}
            </div>
            <button className="arrow right" aria-label="next">›</button>
          </div>
        </section>

        <section className="products-grid">
          {products.map(p => <ProductCard key={p.id} product={p} onAdd={()=>addToCart(p)} />)}
        </section>
      </main>

      <Cart open={cartOpen} onClose={()=>setCartOpen(false)} items={cartItems} onRemove={removeCart} onClear={clearCart} total={total} />

      <footer className="footer">
        <p>© Swapnil's Ecom</p>
      </footer>
    </div>
  )
}
