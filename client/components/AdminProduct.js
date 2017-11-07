import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { AddProduct } from './index.js'


export const AdminProduct = (props) => {
  return (
    <div>
      <AddProduct />
      <table>
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.products.map(product => {
            return (
              <tr key={product.id}>
                <td><img src={product.image} /></td>
                <td><Link to ={`/products/${product.id}`}>{product.name}</Link></td>
                <td>{product.stock}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = null

export default withRouter(connect(mapState, mapDispatch)(AdminProduct))
