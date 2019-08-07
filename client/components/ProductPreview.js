import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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

      <h6 style={{ textAlign: 'center' }}>
        <strong>{product.name}</strong>
      </h6>

      <h6 style={{ textAlign: 'center' }}>
        ${product.price}
      </h6>
    </div>
  )
}

export default ProductPreview;

ProductPreview.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
  }),
};
