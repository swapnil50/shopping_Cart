
import React from 'react';

export default function Navbar({cartCount, onCart}){
  return (
    <header className="nav">
      <div className="nav-left">
        <div className="logo">Swapnil's Ecom</div>
      </div>
      <div className="nav-center">
        <input className="search" placeholder="Search for products..." />
      </div>
      <div className="nav-right">
        <button className="cart-btn" onClick={onCart}>Cart ({cartCount})</button>
      </div>
    </header>
  )
}
