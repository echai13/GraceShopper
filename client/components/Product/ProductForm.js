import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { addProductThunk, editProductThunk } from '../../store'
import { withRouter } from 'react-router-dom'

/**
 * COMPONENT
 */
export class ProductForm extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedCheckboxes: new Set()
    }
    this.toggleCheckbox = this.toggleCheckbox.bind(this)
    this.handleSubmitAll = this.handleSubmitAll.bind(this)
  }

  toggleCheckbox (evt) {
    var selectedCategory = evt.target.value
    this.state.selectedCheckboxes.has(selectedCategory) ? this.state.selectedCheckboxes.delete(selectedCategory) :
    this.state.selectedCheckboxes.add(selectedCategory)
  }

  handleSubmitAll (evt) {
    evt.preventDefault()
    const product = ({ name: evt.target.name.value, image: evt.target.image.value, stock: evt.target.stock.value, description: evt.target.description.value, price: evt.target.price.value, categories: this.state.selectedCheckboxes })

    this.props.handleSubmit(product)
  }

  render() {
    return (
      <div>
        <h3>{this.props.displayName}</h3>
        <form onSubmit={this.handleSubmitAll} className="auth-form">
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
          <div className="form-group row">
            { this.props.categories.map(category => (
              <label key={category.id} htmlFor="category" type="text" className="col-md-4">
                <input type="checkbox" value={category.id} onChange={this.toggleCheckbox} /> {category.name}
              </label>
            ))}
            </div>
          <div className="form-group">
            <button type="submit">{this.props.displayName}</button>
          </div>
        </form>
      </div>
    )
  }
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
    categories: state.categories
  }
}

const mapEdit = (state) => {
  return {
    displayName: 'Edit Product',
    categories: state.categories
  }
}

const mapAddDispatch = (dispatch) => {
  return {
    handleSubmit (product) {
      console.log(product)
      dispatch(addProductThunk(product))
    }
  }
}

const mapEditDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit (product) {
      dispatch(editProductThunk(product, ownProps.match.params.productId))
    }
  }
}

export const AddProduct = withRouter(connect(mapAdd, mapAddDispatch)(ProductForm))
export const EditProduct = withRouter(connect(mapEdit, mapEditDispatch)(ProductForm))
