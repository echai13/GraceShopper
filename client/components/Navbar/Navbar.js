import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { logout, removeCart, searchProducts } from '../../store';

class Navbar extends Component {
  state = {
    searchToggle: false,
  };

  handleSearch = (event) => {
    event.preventDefault();

    const searchTerm = event.target.search.value;

    this.props.handleSubmit(searchTerm);
    this.setState({ searchToggle: false });
  };

  renderSearch() {
    return (
      this.state.searchToggle && <form
        className="form-inline my-2 my-lg-0 justify-content-end" 
        onSubmit={this.handleSearch}
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
                  {!this.props.isLoggedIn && <Link to="/login" className="dropdown-item">Sign In</Link>}
                  {this.props.isLoggedIn && <Link to='/home' className="dropdown-item">My Profile</Link>}
                  {this.props.isAdmin && <Link to='/admin' className="dropdown-item">Admin Panel</Link>}
                  {this.props.isLoggedIn && <Link to="/" onClick={this.props.handleLogout} className="dropdown-item">Log Out</Link>}
                </div>
              </li>
            </ul>
          </div>
        </nav>
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
    handleLogout () {
      dispatch(logout())
      dispatchEvent(removeCart)
      //dispatch removeUser (from store)
      //dispatch removeCart(from store)
    },
    handleSubmit (searchTerm) {
      dispatch(searchProducts(searchTerm));
    },
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar));

Navbar.propTypes = {
  /**
   * function to handle logout user
   */
  handleLogout: PropTypes.func.isRequired,
  /**
   * boolean to check whether user is logged in
   */
  isLoggedIn: PropTypes.bool.isRequired,
  /**
   * boolean to check whether user is admin
   */
  isAdmin: PropTypes.bool,
  /**
   * function to submit search term
   */
  handleSubmit: PropTypes.func.isRequired,
};
