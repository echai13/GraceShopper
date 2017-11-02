import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { setSingleProductThunk } from '../store'
import history from '../history'

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
            (
              <div key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <h3>{product.name}</h3>
                  <img src={product.image} />
                </Link>
                <h3>{product.price}</h3>
                <p>{product.description}</p>
                <h3>{product.stock} </h3>
                <h3>{product.isAvailable} </h3>
                <h3>{product.category}</h3>
                <h3>{product.reviews}</h3>
              </div>
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
