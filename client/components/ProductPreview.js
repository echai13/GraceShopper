import React from 'react'
import { Link } from 'react-router-dom'

const ProductPreview = (props) => {
  const product = props.product;
  //const handleAdd = props.handleAdd;

  return (
    <div key={product.id} className="col-md-4 col-sm-6 col-xs-12 product">
      <Link to={`/products/${product.id}`}>
        <span>
          <img className="d-flex justify-content-center" src={product.image} />
        </span>
      </Link>
      <h6 style={{ textAlign: 'center' }}><strong>{product.name}</strong></h6>
      <h6 style={{ textAlign: 'center' }}><small>$</small>{product.price}</h6>
    </div>
  )
}

export default ProductPreview;
