import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { logout, removeCart, searchProducts } from '../../store';

class Navbar extends Component {
  state = {
    searchToggle: false,
  };

  renderSearch() {
    return (
      this.state.searchToggle && <form
        className="form-inline my-2 my-lg-0 justify-content-end" 
        onSubmit={this.props.handleSubmit}
      >
        <input
          className="form-control mr-sm-2"
          type="text"
          placeholder="Search"
          name="search"
        />

        <button
          className="btn btn-secondary my-2 my-sm-0"
          type="submit"
        >
          Search
        </button>
      </form>
    );
  };

  renderCollapsedMenu() {
    return (
      <div className="collapse navbar-collapse" id="navbarToggleExternalContent">
        <div className="bg-inverse p-4">
          <div className="row d-flex justify-content-center">

            <div className="col-md-2 col-sm-4 col-4">
              <Link to="/products">All Products</Link>
            </div>

            <div className="col-md-2 col-sm-4 col-12">
              <a href="https://github.com/cmccarthy15/GraceShopper">Our GitHub</a>
            </div>

            {this.props.isAdmin && <div className="col-md-2 col-sm-4 col-12">
              <Link to="/admin">Admin</Link>
            </div>}

            {this.props.isLoggedIn && <div className="col-md-2 col-sm-4 col-12">
              <a href="/" onClick={this.props.handleClick}>Logout</a>
            </div>}
            
            <div className="col-md-2 col-sm-4 col-12">FAQ</div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
        <nav className="navbar navbar-expand justify-content-between">
          <div className="navbrand">
            <Link className="my-navbrand" to="/">BorgPet<span style={{ color: 'lightcyan' }}>Co</span></Link>
          </div>

          <div className="d-flex" id="navbarToggleExternalContent">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0 align-items-center">
              <li className="nav-item">
                <Link to="/cart" className="shopping-cart d-flex align-items-center">
                  <i className="fa fa-shopping-cart" />
                  <span className="badge" />
                </Link>
              </li>

              <li className="nav-item mr-auto">
                <button type="button" className="search-button" onClick={() => this.setState({ searchToggle: !this.state.searchToggle })}>
                  <i className="fa fa-search" />
                </button>
                {this.renderSearch()}
              </li>

              <li className="nav-item dropdown">
                <a
                  className="d-flex align-items-center nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-user" />
                </a>

                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to='/home' className="dropdown-item">My Profile</Link>
                  <Link to='/admin' className="dropdown-item">Admin Panel</Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        // {this.renderCollapsedMenu()}
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id, //coerces empty objects to boolean
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
      dispatchEvent(removeCart)
      //dispatch removeUser (from store)
      //dispatch removeCart(from store)
    },
    handleSubmit (evt) {
      evt.preventDefault()
      dispatch(searchProducts(evt.target.search.value)) //searchProducts from store reducer
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar))

Navbar.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
