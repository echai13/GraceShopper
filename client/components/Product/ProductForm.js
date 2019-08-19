import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { addProductThunk, editProductThunk } from '../../store'
import { withRouter } from 'react-router-dom'

/**
 * COMPONENT
 */
export class ProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCheckboxes: new Set(),
      name: props.singleProduct.name,
      image: props.singleProduct.image,
      stock: props.singleProduct.stock,
      price: props.singleProduct.price,
      description: props.singleProduct.description,
      formError: '',
    };

    this.toggleCheckbox = this.toggleCheckbox.bind(this)
    this.handleSubmitAll = this.handleSubmitAll.bind(this)
  };

  handleEditChange = (key) => (event) => {
    this.setState({ [key]: event.target.value });
  };

  toggleCheckbox (evt) {
    var selectedCategory = evt.target.value
    this.state.selectedCheckboxes.has(selectedCategory) ? this.state.selectedCheckboxes.delete(selectedCategory) :
    this.state.selectedCheckboxes.add(selectedCategory)
  }

  handleSubmitAll (evt) {
    evt.preventDefault();

    const selectedCheckboxes = [...this.state.selectedCheckboxes];

    if (!selectedCheckboxes.length) {
      this.setState({ formError: 'Categories cannot be empty.' });
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }

    const product = ({
      name: evt.target.name.value,
      image: evt.target.image.value,
      stock: evt.target.stock.value,
      description: evt.target.description.value,
      price: evt.target.price.value,
      categories: selectedCheckboxes
    });

    this.props.handleSubmit(product);
    this.props.toggleEditForm();
  }

  render() {
    return (
      <div>
        <h3>{this.props.displayName}</h3>
        <form onSubmit={this.handleSubmitAll} className="auth-form">
          <div className="error">{this.state.formError}</div>
          <div className="form-group">
            <label htmlFor="name"><small>Name</small></label>
            <input name="name" type="text" className="form-control" value={this.state.name} onChange={this.handleEditChange('name')} />
          </div>
          <div className="form-group">
            <label htmlFor="image"><small>Image</small></label>
            <input name="image" type="text" className="form-control" value={this.state.image} onChange={this.handleEditChange('image')} />
          </div>
          <div className="form-group">
            <label htmlFor="stock"><small>Stock</small></label>
            <input name="stock" type="text" className="form-control" value={this.state.stock} onChange={this.handleEditChange('stock')} />
          </div>
          <div className="form-group">
            <label htmlFor="price"><small>Price</small></label>
            <input name="price" type="text" className="form-control" value={this.state.price} onChange={this.handleEditChange('price')} />
          </div>
          <div className="form-group">
            <label htmlFor="description"><small>Description</small></label>
            <textarea name="description" className="form-control" value={this.state.description} onChange={this.handleEditChange('description')} />
          </div>
          <div className="form-group row">
            { this.props.categories.map(category => (
              <label key={category.id} htmlFor="category" type="text" className="col-md-4">
                <input type="checkbox" value={category.id} onChange={this.toggleCheckbox}/> {category.name}
              </label>
            ))}
            </div>
          <div className="form-group">
            <button type="submit" className="btn btn-round btn-info">{this.props.displayName}</button>
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
    categories: state.categories,
    singleProduct: state.singleProduct,
  }
}

const mapAddDispatch = (dispatch) => {
  return {
    handleSubmit (product) {
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
