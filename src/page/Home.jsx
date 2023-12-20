// home.jsx
import React, { memo } from 'react';
import "./home.css";

const products = [
  { id: 1, name: 'Product 1', price: 10, image: "./public/products/maleshoe1.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
  { id: 2, name: 'Product 2', price: 20, image: "./public/products/maleshoe1.jpg"},
  { id: 3, name: 'Product 3', price: 30, image: "./public/products/maleshoe1.jpg"},
  { id: 4, name: 'Product 4', price: 40, image: "./public/products/maleshoe1.jpg"},
  
];

function Home() {
  return (
    <div>
      <div className='header'>
        <img src="./products/model1.png" alt="model" />
        <div className="header-text">
          <h1>Discover and find Your own fashion</h1><br/>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Totam molestias minima, obcaecati nam accusamus provident 
            voluptates dignissimos ducimus temporibus. Eos nulla debitis
             animi laboriosam saepe rem ratione amet molestiae at.</p>
          <button class="btn btn-outline-success">Explore</button>
        </div>
      </div>
      <div className='product-container'>
        <h2>Best Selling</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className='products'>
          {products.map(product => (
            <div key={product.id} className='product'>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Product Details: ${product.description}</p>
            </div>
          ))}
        </div>
        <button class="btn btn-outline-success">see all</button>
      </div>
    </div>
  );
}

export default memo(Home);
