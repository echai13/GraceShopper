import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Products = (props) => {
  const {products, categories} = props

  return (
    <div>
      <div className="categories">
        {categories.map( category => (
          <h3 key={category.id}>{category.name}</h3>
        ))}
      </div>
      {products.map( product => {
        return (
        <div key = {product.id}>
          <h3>{product.name}</h3>
          <img src = {product.image} />
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
    products: state.products,
    categories: state.categories
  }
}

export default connect(mapState)(Products)
