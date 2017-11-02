import React from 'react'
import { Link } from 'react-router-dom'

const ProductPreview = (props) => {
  const product = props.product;

  return (
    <div key={product.id}>
      <Link to={`/products/${product.id}`}>
        <h3>{product.name}</h3>
        <img src={product.image} />
      </Link>
      <h3>{product.price}</h3>
      <p>{product.description}</p>
      <h3>{product.stock} </h3>
      <h3>{product.isAvailable} </h3>
      <h3>{product.category}</h3>
      <h3>{product.reviews}</h3>
    </div>
  )
}

export default ProductPreview;
