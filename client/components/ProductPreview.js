import React from 'react'
import { Link } from 'react-router-dom'

const ProductPreview = (props) => {
  const product = props.product;
  //const handleAdd = props.handleAdd;

  return (
    <div key={product.id} className="col-md-4 product">
      <Link to={`/products/${product.id}`}>
        <h3>{product.name}</h3>
        <img src={product.image} />
      </Link>
      <h3><small>$</small>{product.price}</h3>
    </div>
  )
}

export default ProductPreview;
