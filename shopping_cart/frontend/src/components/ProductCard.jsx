
import React from 'react';

export default function ProductCard({product, onAdd}){
  return (
    <div className="card">
      <div className="card-image">
        <img src={'http://localhost:4000' + product.image} alt={product.name} />
      </div>
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="desc">{product.description}</p>
        <div className="card-footer">
          <div className="price">₹{product.price}</div>
          <button className="add-btn" onClick={onAdd}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
