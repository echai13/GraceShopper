import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AdminUser, AdminProduct, AdminOrder, CategoryForm, AddProduct } from './index.js';
import { getAdminUsers, getAdminOrders, getProductsThunk } from '../store';

const statuses = ['open', 'completed', 'confirmed', 'shipped'];

export class AdminPanel extends Component {
  constructor() {
    super()
    this.state = {
      view: 'users',
      toggleCategory: false,
      toggleAdd: false,
      statusView: 'all'
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.updateStatusView = this.updateStatusView.bind(this)
  }

  componentDidMount(){
    this.props.fetchAll()
  }

  updateStatusView (status) {
    this.setState({statusView: status})
  }

  handleToggle (type) {
    type === 'category' ?
    this.setState({ toggleCategory: !this.state.toggleCategory, toggleAdd: false }) :
    this.setState({ toggleAdd: !this.state.toggleAdd, toggleCategory: false })

    this.setState({ view: 'products' })
  }

  handleClick(type) {
    this.setState({view: type, toggleCategory: false, toggleAdd: false})
  }

  getStat = (key) => {
    return this.props[key] ? this.props[key].length : 0;
  };

  render() {
    return (
      <div className="admin-panel">
        {/* <h1>Admin Panel</h1> */}
        <div className="row">
          <div className="col-md-2 col-sm-2 col-xs-12">
            <nav className="navbar navbar-toggleable-md navbar-toggleable-sm">
              <button className="navbar-toggler navbar-toggler-right collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="fa fa-angle-down" />
              </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul>
                <li><a onClick={() => this.handleClick('users')}>Users</a></li>
                <li><a onClick={() => this.handleClick('orders')}>Orders</a>
                  { this.state.view === 'orders' &&
                  <ul>
                    <li key={0}><a onClick={() => this.updateStatusView('all')}>All</a></li>
                    {statuses.map(status => (
                    <li key={status}><a onClick={() => this.updateStatusView(status) }>{status}</a></li>
                    ))}
                  </ul>
                  }
                </li>
                <li><a onClick={() => this.handleClick('products')}>Products</a>
                  { this.state.view === 'products' &&
                  <ul>
                    <li><a onClick={() => this.handleToggle('category')}>Add New Category</a></li>
                    <li><a onClick={() => this.handleToggle('product')}>Add New Product</a></li>
                  </ul>
                  }
                </li>
                <li><a>Analytics</a></li>
                <li><a>Import/Export Data</a></li>
                <li><a>Integrations</a></li>
                <li><a>Customizations</a></li>
              </ul>
            </div>
            </nav>
          </div>

          <div className="col-md-10 col-sm-10">
            <div className="row summary">
              <div className="col-md-4">
                <div className="d-flex justify-content-center align-items-center">
                  <p>{this.getStat('products')}</p>
                </div>
                <h4>Products</h4>
              </div>

              <div className="col-md-4">
                <div className="d-flex justify-content-center align-items-center">
                  <p>{this.getStat('users')}</p>
                </div>
                <h4>Users</h4>
              </div>

              <div className="col-md-4">
                <div className="d-flex justify-content-center align-items-center">
                  <p>{this.getStat('orders')}</p>
                </div>
                <h4>Orders</h4>
              </div>
            </div>

            <div className="row details">
              <div className="col-md-12">
                {this.state.view === 'users' &&
                  <AdminUser />
                }
                {this.state.view === 'orders' && //could add total
                  <AdminOrder orderStatus={this.state.statusView} />
                }
                {this.state.view === 'products' && !this.state.toggleCategory && !this.state.toggleAdd &&
                  <AdminProduct />
                }
                {this.state.toggleCategory &&
                  <CategoryForm />
                }
                {this.state.toggleAdd &&
                <AddProduct />
              }
              </div>
            </div>

          </div>
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
