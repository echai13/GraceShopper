import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { addProductToCart, getProductsThunk } from '../store'
import history from '../history'
import ProductPreview from './ProductPreview'

/**
 * COMPONENT
 */
export class Products extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentCategory: 'All'
    }
    this.updateCategory = this.updateCategory.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
  }

  updateCategory = (category) => {
    console.log('updating state')
    this.setState({currentCategory: category});
    this.props.fetchAllProducts()
  }

  /* this could be used in the product preview to add a single product to the cart
  but it is not working currently and it's low priority
  */
  addProductToCart = (id) => {
    this.props.handleAdd({productId: id, quantity: 1});
  }

  render() {
    const { products, categories } = this.props
    const currentCategory = this.state.currentCategory;

    return (
      <div>
        <h1>All Products Page</h1>

        <div className="categories">
          <button key={0} className="long-button" onClick={() => this.updateCategory('all')}>all</button>
          {categories.map(category => (
            <button key={category.id} className="long-button" onClick={() => this.updateCategory(category.name)}>{category.name}</button>
          ))}
        </div>
        <div className="row">
        {products.map(product => {
          console.log('product is: ', product);
          const categoryNames = product.categories.map(category => category.name);
          return (currentCategory === 'all' || categoryNames.indexOf(currentCategory) > -1) && product.isAvailable ?
            (
              <ProductPreview key ={product.id} product={product} handleAdd={this.addProductToCart} />
            )
            :
            null
        })}
        </div>
      </div>
    )
  }

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


const mapDispatch = (dispatch, ownProps) => {
  return {
    handleAdd(productInfo) {
      dispatch(addProductToCart(productInfo));
    },
    fetchAllProducts () {
      dispatch(getProductsThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(Products)
