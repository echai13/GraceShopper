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
      currentCategory: 'All',
    }
    this.updateCategory = this.updateCategory.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
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
    const sortOptions = ['name: A to Z', 'name: Z to A', 'price: low to high', 'price: high to low']
    let stars = [], numOfStars = ''
    for (let i = 5; i >= 1; i--) {
      for (let j = i; j >= 1; j--) {
        numOfStars += '★'
      }
      for (let k = 5 - i; k >= 1; k--) {
        numOfStars += '☆'
      }
      stars.push(numOfStars)
      numOfStars = ''
    }

    return (
      <div className="product-page">
        <div className="row product-page-image" />

        <div className="row show-products">
          <div className="col-md-3 col-sm-12 col-xs-12 categories">
            <div className="row">
              <div className="col-md-12 col-sm-6 col-xs-12">
                <h6 className="d-flex justify-content-center align-items-center">Select Categories</h6>
              </div>
            </div>
            <div className="row d-flex justify-content-center listCategories">
              <span>
              <div className="col-md-12 col-sm-6 col-xs-12">
                <label>
                  <input
                    type="radio"
                    key={0}
                    checked={this.state.currentCategory === 'All'}
                    onChange={() => this.updateCategory('All')} />All
                </label>
              </div>
              {categories.map(category => (
                <div key={category.id} className="col-md-12 col-sm-6 col-xs-12">
                  <label>
                    <input
                      type="radio"
                      value={category.name}
                      checked={this.state.currentCategory === category.name}
                      onChange={() => this.updateCategory(category.name)}
                    />{category.name}
                  </label>
                </div>
              ))}
            </span>
            </div>

            <div className="row">
              <div className="col-md-12 col-sm-6 col-xs-12">
                <h6 className="d-flex justify-content-center align-items-center">Sort Product Listings</h6>
              </div>
            </div>
            <div className="row sortDropdown">
              <div className="col-md-12 col-sm-6 col-xs-12 d-flex justify-content-center">
                <select>Sort by:
                  { sortOptions.map(option => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row sortByReviews">
              <div className="col-md-12 col-sm-6 col-xs-12">
                <h6 className="d-flex justify-content-center align-items-center">By Reviews</h6>
                <ul>
                  { stars && stars.map((star, idx) => (
                    <li key={star}>{star.length - idx} stars {star}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-9 col-sm-12 col-xs-12 all-products">
            <div className="row">
              {products.map(product => {
                const categoryNames = product.categories.map(category => category.name);
                return (currentCategory === 'All' || categoryNames.indexOf(currentCategory) > -1) && product.isAvailable ?
                  (
                    <ProductPreview key ={product.id} product={product} handleAdd={this.addProductToCart} />
                  )
                  :
                  null
              })}
            </div>
          </div>
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
