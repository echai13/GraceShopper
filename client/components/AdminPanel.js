import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllOrders } from '../store'



export class AdminPanel extends Component {
  constructor(){
    super();
    this.state = {view: '', orders: []}
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.props.getAllOrders()
      .then(orders => {
        console.log('inside of component did mount: ', orders);
        this.setState({orders: orders})
      })
  }

  handleClick(evt) {
    this.setState({view: evt.target.value})
  }

  render() {
    const { products } = this.props;
    console.log(products);
    return (
      <div>
        <h1>Admin Panel</h1>
        <div>
          <button value="users" onClick={this.handleClick}>Users</button>
          <button value="orders" onClick={this.handleClick}>Orders</button>
          <button value="products" onClick={this.handleClick}>Products</button>
        </div>
        <div>
          {this.state.view === 'users' &&
            <h1> Users </h1>
          }
          {this.state.view === 'orders' &&
            <div>
              <h1> Orders </h1>
              { products.map(product => {
                  return (
                    <div key={product.id}>
                      <h3>{product.name}</h3>
                    </div>
                  )
                })}
            </div>
          }
          {this.state.view === 'products' &&
            <div>
              <h1> Products </h1>
              { products.map(product => {
                return (
                  <div key={product.id}>
                  <h3>{product.name}</h3>
                  </div>
                )
              })}
            </div>
          }
        </div>
      </div>
    )
  }
}

const mapPropToCart = (state) => {
  return {
    products: state.products
  };
}


const mapDispatch = (dispatch, ownProps) => {
  return {
    getAllOrders() {
      return dispatch(getAllOrders());
    }
  }
}


export default connect(mapPropToCart, mapDispatch)(AdminPanel)
