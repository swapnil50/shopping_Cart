
import React from 'react';

export default function Cart({open, onClose, items, onRemove, onClear, total}){
  if(!open) return null;
  return (
    <div className="cart-overlay">
      <div className="cart-panel">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="cart-body">
          {items.length===0 && <p>Your cart is empty.</p>}
          {items.map(i=> (
            <div key={i.cart_id} className="cart-item">
              <img src={'http://localhost:4000' + i.image} alt={i.name} />
              <div className="ci-info">
                <div className="ci-name">{i.name}</div>
                <div>Qty: {i.quantity}</div>
                <div>₹{i.price * i.quantity}</div>
              </div>
              <div><button onClick={()=>onRemove(i.cart_id)}>Remove</button></div>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div className="total">Total: ₹{total}</div>
          <div className="cart-actions">
            <button onClick={onClear}>Clear Cart</button>
            <button onClick={()=> alert('Thank you for your order! (demo)')}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
