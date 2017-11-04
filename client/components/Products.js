import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { setSingleProductThunk } from '../store'
import history from '../history'
import ProductPreview from './ProductPreview'

/**
 * COMPONENT
 */
export class Products extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentCategory: 'all'
    }
    this.updateCategory = this.updateCategory.bind(this);
  }


  updateCategory = (category) => {
    console.log('updating state')
    this.setState({currentCategory: category});
  }

  render() {
    const { products, categories } = this.props
    const currentCategory = this.state.currentCategory;

    return (
      <div>
        <h1>All Products Page</h1>

        <div className="categories">
          <button key={0} onClick={() => this.updateCategory('all')}>all</button>
          {categories.map(category => (
            <button key={category.id} onClick={() => this.updateCategory(category.name)}>{category.name}</button>
          ))}
        </div>

        {products.map(product => {
          const categoryNames = product.categories.map(category => category.name);
          return currentCategory === 'all' || categoryNames.indexOf(currentCategory) > -1 ?
            ( <ProductPreview key ={product.id} product={product} />
            )
            :
            null
        })}
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

export default connect(mapState)(Products)
