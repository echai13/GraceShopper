import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AdminUser, AdminProduct, AdminOrder } from './index.js'
import { getAdminUsers, getAdminOrders, getProductsThunk } from '../store'


export class AdminPanel extends Component {
  constructor() {
    super()
    this.state = {
      view: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    this.props.fetchAll()
  }

  handleClick(evt) {
    this.setState({view: evt.target.value})
  }

  render() {
    // const { products } = this.props;
    // const { orders, users } = this.state;
    // console.log(users);
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
            <AdminUser />
          }
          {this.state.view === 'orders' && //could add total
            <AdminOrder />
          }
          {this.state.view === 'products' &&
            <AdminProduct />
          }
        </div>
      </div>
    )
  }
}

const mapPropToCart = (state) => {
  console.log(state)
  return {
    products: state.products,
    orders: state.admin.orders,
    users: state.admin.users
  };
}


const mapDispatch = (dispatch) => {
  return {
    fetchAll: () => {
      dispatch(getAdminUsers())
      dispatch(getAdminOrders())
      dispatch(getProductsThunk())
    }
  }
}


export default connect(mapPropToCart, mapDispatch)(AdminPanel)
