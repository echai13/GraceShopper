import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/**
*  COMPONENT: From All Products Page, the singleProduct's state is set when a single product is clicked on
*/

export const SingleProduct = (props) => {
  const { singleProduct } = props

  return (

    <div>
      <h1>{singleProduct.name}</h1>
      <img src={singleProduct.image} />

      <div>
        <h3>{singleProduct.price}</h3>
        {/* Tells customers if product is in stock */}
        {
          singleProduct.isAvailable ?
          <span>In Stock</span> :
          <span>Currently Out of Stock</span>
        }
        <h3>{singleProduct.category}</h3>
        <p>{singleProduct.description}</p>
        <p>{singleProduct.reviews}</p>
      </div>
    </div>
  )
}

/**
* CONTAINER
*/
const mapState = (state) => {
  console.log(state.singleProduct)
  return {
    singleProduct: state.singleProduct
  }
}

export default connect(mapState)(SingleProduct)
