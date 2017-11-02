import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setSingleProductThunk } from '../store/singleProduct'

/**
*  COMPONENT: From All Products Page, the singleProduct's state is set when a single product is clicked on
*/

export const SingleProduct = (props) => {
  const { singleProduct, fetchSingleProduct } = props
  fetchSingleProduct()

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
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchSingleProduct () {
      dispatch(setSingleProductThunk(ownProps.match.params.productId))
    }
  }
}
export default connect(mapState, mapDispatch)(SingleProduct)
