import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Products = (props) => {
  const {products} = props

  return (
    <div>
      {products.map( product => {
        return (
        <div key = {product.id}>
          <h3>{product.name}</h3>
          <img src = {product.image}/>
          <h3>{product.price}</h3>
          <p>{product.description}</p>
          <h3>{product.stock} </h3>
          <h3>{product.isAvailable} </h3>
          <h3>{product.category}</h3>
          <h3>{product.reviews}</h3>
        </div>
          )
      })}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    products: state.products 
  }
}

export default connect(mapState)(Products)