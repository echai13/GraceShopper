import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllOrders, getAllUsers } from '../store'

export class AdminPanel extends Component {
  constructor(){
    super();
    this.state = {view: '', orders: [], users: []}
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.props.getAllOrders()
      .then(orders => {
        this.setState({orders: orders})
      })
    this.props.getAllUsers()
      .then(users => {
        this.setState({users: users})
      })
  }

  handleClick(evt) {
    this.setState({view: evt.target.value})
  }

  render() {
    const { products } = this.props;
    const { orders, users } = this.state;
    console.log(users);
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
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Admin?</th>
                </tr>
              </thead>
              <tbody>
                { users.map(user => {
                  return (
                    <tr key={user.id}>
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? 'yes' : 'no'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          }
          {this.state.view === 'orders' && //could add total
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
              { orders.map(order => {
                  return (
                    <tr key={order.id}>
                      <td>{order.user.fullName}</td>
                      <td>{order.user.email}</td>
                      <td>{order.status}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          }
          {this.state.view === 'products' &&
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
                {products.map(product => {
                  return (
                    <tr key={product.id}>
                      <td><img src={product.image} /></td>
                      <td>{product.name}</td>
                      <td>{product.stock}</td>
                      <td>{product.price}</td>
                      <td>{product.description}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
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
    },
    getAllUsers() {
      return dispatch(getAllUsers());
    }
  }
}


export default connect(mapPropToCart, mapDispatch)(AdminPanel)
