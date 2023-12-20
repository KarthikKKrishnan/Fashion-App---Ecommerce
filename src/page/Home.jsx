import React, { memo } from 'react'

import "./home.css";

const products = [
  { id: 1, name: 'Product 1', price: 10, image: "./public/products/product1.jpg"},
  { id: 1, name: 'Product 1', price: 10, image: "./public/products/product1.jpg"},
]
  


function Home() {
  return (
    <div className='products-container'>
       <h1>Discover and find Your own fashion</h1>
       <p>lodxsgbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</p>
       <img src="" alt="" />
       <div className='products'>
          {products.map(product => (
            <div key={product.id} className='product'>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
            </div>
          ))}
       </div>
    </div>
  )
}

export default memo(Home);