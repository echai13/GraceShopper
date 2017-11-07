import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { addProductThunk, editProductThunk } from '../store'
import { withRouter } from 'react-router-dom'

/**
 * COMPONENT
 */
const ProductForm = (props) => {
  console.log(`in ProductForm`)
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name"><small>Name</small></label>
          <input name="name" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="image"><small>Image</small></label>
          <input name="image" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="stock"><small>Stock</small></label>
          <input name="stock" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="price"><small>Price</small></label>
          <input name="price" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="description"><small>Description</small></label>
          <input name="description" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <button type="submit">{props.displayName}</button>
        </div>
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapAdd = (state) => {
  return {
    displayName: 'Add Product',
  }
}

const mapEdit = (state) => {
  return {
    displayName: 'Edit Product',
  }
}

const mapAddDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      dispatch(addProductThunk({ name: evt.target.name.value, image: evt.target.image.value, stock: evt.target.stock.value, description: evt.target.description.value, price: evt.target.price.value }))
    }
  }
}

const mapEditDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      dispatch(editProductThunk({ name: evt.target.name.value, image: evt.target.image.value, stock: evt.target.stock.value, description: evt.target.description.value, price: evt.target.price.value }, ownProps.match.params.productId))
    }
  }
}

export const AddProduct = withRouter(connect(mapAdd, mapAddDispatch)(ProductForm))
export const EditProduct = withRouter(connect(mapEdit, mapEditDispatch)(ProductForm))
