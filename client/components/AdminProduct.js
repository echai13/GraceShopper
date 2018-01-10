import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { AddProduct, CategoryForm } from './index.js'
import { removeProductThunk } from '../store'

export class AdminProduct extends Component {

  handleToggle (evt) {
    evt.target.name === 'category' ?
    this.setState({ toggleCategory: !this.state.toggleCategory }) :
    this.setState({ toggleAdd: !this.state.toggleAdd })
  }

  render() {
    return (
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Description</th>
              <th>Categories</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map(product => {
              return (
                <tr key={product.id}>
                  <td><img src={product.image} /></td>
                  <td><Link to ={`/products/${product.id}`}>{product.name}</Link></td>
                  <td>{product.stock}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>{product.categories.map(category => category.name).join(', ')}</td>
                  <td><button className="btn btn-info btn-round" type="submit" onClick={() => {this.props.handleClick(product.id)}}>X</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick(productId) {
      dispatch(removeProductThunk(productId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(AdminProduct))
